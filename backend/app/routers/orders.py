from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.config import get_settings
from app.database import get_db
from app.models.enums import OrderStatus, OrderType
from app.models.meal import Meal
from app.models.order import Order
from app.models.order_position import OrderPosition
from app.models.user import User
from app.schemas.order import OrderCheckoutRequest, OrderDto, OrderStatusPatchDto
from app.services import staff_access
from app.services.session_auth import ensure_customer, get_user_from_bearer
from app.services.telegram_auth import verify_bot_link_token, verify_telegram_init_data
from app.services.telegram_notifier import notify_order_placed, notify_user_status_changed

router = APIRouter(prefix="/api/v1/orders", tags=["orders"])


def _to_dto(order: Order) -> OrderDto:
    return OrderDto(
        id=order.id,
        status=order.status.value,
        userId=order.user_id,
        deliveryAddress=order.delivery_address,
        restaurantId=order.restaurant_id,
        createdAt=order.created_at,
        updatedAt=order.updated_at,
        courierId=order.courier_id,
        orderType=order.order_type.value,
        itemsTotal=order.items_total,
        deliveryFee=order.delivery_fee,
        serviceFee=order.service_fee,
        total=order.total,
    )


async def _require_legacy_customer_user(
    db: AsyncSession,
    init_data: str,
    bot_auth_token: str | None = None,
) -> User:
    settings = get_settings()
    telegram_id: int | None = None
    username: str | None = None

    if init_data:
        tg = verify_telegram_init_data(init_data, settings.user_bot_token)
        if tg and tg.get("id") is not None:
            telegram_id = int(tg["id"])
            username = tg.get("username")

    if telegram_id is None and bot_auth_token:
        telegram_id = verify_bot_link_token(bot_auth_token, settings.user_bot_token)

    if telegram_id is None:
        raise HTTPException(401, "Invalid Telegram init data")

    return await ensure_customer(db, telegram_id, username)


async def _require_customer_user(
    db: AsyncSession,
    authorization: str | None = None,
    init_data: str = "",
    bot_auth_token: str | None = None,
) -> User:
    bearer_user = await get_user_from_bearer(db, authorization)
    if bearer_user:
        return bearer_user
    return await _require_legacy_customer_user(db, init_data, bot_auth_token)


async def _require_admin_user(db: AsyncSession, init_data: str) -> User:
    settings = get_settings()
    tg = verify_telegram_init_data(init_data, settings.admin_bot_token)
    if not tg:
        raise HTTPException(401, "Invalid Telegram init data")
    result = await db.execute(select(User).where(User.id == tg["id"]))
    user = result.scalars().first()
    if not user:
        raise HTTPException(403, "Unknown user")
    return user


@router.get("")
async def get_all(
    userId: int | None = None,
    restaurantId: int | None = None,
    status: str | None = None,
    db: AsyncSession = Depends(get_db),
    authorization: str | None = Header(None, alias="Authorization"),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
    x_kulcha_bot_auth: str | None = Header(None, alias="X-Kulcha-Bot-Auth"),
    x_kulcha_bot_secret: str | None = Header(None, alias="X-Kulcha-Bot-Secret"),
):
    settings = get_settings()
    init_data = (x_telegram_init_data or x_init_data or "").strip()
    if userId is not None:
        if (
            x_kulcha_bot_secret
            and settings.bot_api_secret
            and x_kulcha_bot_secret == settings.bot_api_secret
        ):
            result = await db.execute(
                select(Order)
                .options(
                    joinedload(Order.user),
                    joinedload(Order.restaurant),
                    joinedload(Order.courier),
                )
                .where(Order.user_id == userId)
                .order_by(Order.created_at.desc())
            )
            return [_to_dto(order) for order in result.unique().scalars().all()]

        user = await _require_customer_user(db, authorization, init_data, x_kulcha_bot_auth)
        if user.id != userId:
            raise HTTPException(403, "Cannot read other users orders")
        result = await db.execute(
            select(Order)
            .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
            .where(Order.user_id == userId)
            .order_by(Order.created_at.desc())
        )
        return [_to_dto(order) for order in result.unique().scalars().all()]

    if restaurantId is not None:
        admin = await _require_admin_user(db, init_data)
        await staff_access.require_restaurant_staff(db, admin.id, restaurantId)
        result = await db.execute(
            select(Order)
            .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
            .where(Order.restaurant_id == restaurantId)
            .order_by(Order.created_at.desc())
        )
        return [_to_dto(order) for order in result.unique().scalars().all()]

    if status is not None:
        try:
            parsed_status = OrderStatus(status)
        except ValueError as exc:
            raise HTTPException(400, f"Invalid status: {status}") from exc
        result = await db.execute(
            select(Order)
            .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
            .where(Order.status == parsed_status)
            .order_by(Order.created_at.desc())
        )
        return [_to_dto(order) for order in result.unique().scalars().all()]

    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
        .order_by(Order.created_at.desc())
    )
    return [_to_dto(order) for order in result.unique().scalars().all()]


@router.get("/my")
async def get_my_orders(
    db: AsyncSession = Depends(get_db),
    authorization: str | None = Header(None, alias="Authorization"),
):
    user = await get_user_from_bearer(db, authorization)
    if not user:
        raise HTTPException(401, "Authorization bearer token is required")

    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
        .where(Order.user_id == user.id)
        .order_by(Order.created_at.desc())
    )
    return [_to_dto(order) for order in result.unique().scalars().all()]


@router.get("/{order_id}")
async def get_by_id(
    order_id: int,
    db: AsyncSession = Depends(get_db),
    authorization: str | None = Header(None, alias="Authorization"),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
    x_kulcha_bot_auth: str | None = Header(None, alias="X-Kulcha-Bot-Auth"),
    x_kulcha_internal_secret: str | None = Header(None, alias="X-Kulcha-Internal-Secret"),
):
    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
        .where(Order.id == order_id)
    )
    order = result.unique().scalars().first()
    if not order:
        raise HTTPException(404, "Order not found")

    settings = get_settings()
    if settings.internal_api_secret and x_kulcha_internal_secret == settings.internal_api_secret:
        return _to_dto(order)

    bearer_user = await get_user_from_bearer(db, authorization)
    if bearer_user:
        if order.user_id != bearer_user.id:
            raise HTTPException(403, "Forbidden")
        return _to_dto(order)

    init_data = (x_telegram_init_data or x_init_data or "").strip()
    if not init_data and not x_kulcha_bot_auth:
        raise HTTPException(401, "Telegram init data required")

    try:
        admin = await _require_admin_user(db, init_data)
        await staff_access.require_restaurant_staff(db, admin.id, order.restaurant_id)
        return _to_dto(order)
    except HTTPException as exc:
        if exc.status_code != 401:
            raise

    customer = await _require_legacy_customer_user(db, init_data, x_kulcha_bot_auth)
    if order.user_id != customer.id:
        raise HTTPException(403, "Forbidden")
    return _to_dto(order)


@router.post("/checkout", status_code=201)
async def checkout(
    body: OrderCheckoutRequest,
    db: AsyncSession = Depends(get_db),
    authorization: str | None = Header(None, alias="Authorization"),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
    x_kulcha_bot_auth: str | None = Header(None, alias="X-Kulcha-Bot-Auth"),
):
    init_data = (x_telegram_init_data or x_init_data or "").strip()
    customer = await _require_customer_user(db, authorization, init_data, x_kulcha_bot_auth)

    if not body.items:
        raise HTTPException(400, "Invalid checkout payload")

    order = Order(
        status=OrderStatus.CREATED,
        user_id=customer.id,
        delivery_address=body.deliveryAddress,
        restaurant_id=body.restaurantId,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        order_type=OrderType(body.orderType),
        items_total=body.itemsTotal or Decimal(0),
        delivery_fee=body.deliveryFee or Decimal(0),
        service_fee=body.serviceFee or Decimal(0),
        total=body.total or Decimal(0),
    )
    db.add(order)
    await db.flush()

    for line in body.items:
        if line.quantity is None or line.quantity <= 0:
            raise HTTPException(400, "Invalid order line")
        result = await db.execute(
            select(Meal).options(joinedload(Meal.restaurant)).where(Meal.id == line.mealId)
        )
        meal = result.unique().scalars().first()
        if not meal:
            raise HTTPException(400, "Unknown meal")
        if meal.restaurant_id != body.restaurantId:
            raise HTTPException(400, "Meal does not belong to restaurant")
        unit_price = line.unitPrice if line.unitPrice is not None else meal.price
        line_total = unit_price * line.quantity

        position = OrderPosition(
            meal_id=meal.id,
            order_id=order.id,
            quantity=line.quantity,
            unit_price=unit_price,
            total_price=line_total,
        )
        db.add(position)

    await db.flush()
    await notify_order_placed(db, order.id)

    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
        .where(Order.id == order.id)
    )
    saved = result.unique().scalar_one()
    return _to_dto(saved)


@router.put("/{order_id}")
async def update_order(
    order_id: int,
    dto: OrderDto,
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str = Header(..., alias="X-Telegram-Init-Data"),
):
    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
        .where(Order.id == order_id)
    )
    existing = result.unique().scalars().first()
    if not existing:
        raise HTTPException(404, "Order not found")

    admin = await _require_admin_user(db, x_telegram_init_data)
    await staff_access.require_restaurant_staff(db, admin.id, existing.restaurant_id)

    if dto.status is not None:
        existing.status = OrderStatus(dto.status)
    if dto.deliveryAddress is not None:
        existing.delivery_address = dto.deliveryAddress
    if dto.courierId is not None:
        existing.courier_id = dto.courierId
    if dto.orderType is not None:
        existing.order_type = OrderType(dto.orderType)
    if dto.itemsTotal is not None:
        existing.items_total = dto.itemsTotal
    if dto.deliveryFee is not None:
        existing.delivery_fee = dto.deliveryFee
    if dto.serviceFee is not None:
        existing.service_fee = dto.serviceFee
    if dto.total is not None:
        existing.total = dto.total
    existing.updated_at = datetime.now()

    await db.flush()
    await notify_user_status_changed(db, order_id)

    return _to_dto(existing)


@router.patch("/{order_id}/status")
async def patch_status(
    order_id: int,
    body: OrderStatusPatchDto,
    db: AsyncSession = Depends(get_db),
    x_kulcha_internal_secret: str = Header(..., alias="X-Kulcha-Internal-Secret"),
):
    settings = get_settings()
    if not settings.internal_api_secret:
        raise HTTPException(503, "Internal API secret is not configured")
    if x_kulcha_internal_secret != settings.internal_api_secret:
        raise HTTPException(401, "Invalid internal secret")

    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
        .where(Order.id == order_id)
    )
    order = result.unique().scalars().first()
    if not order:
        raise HTTPException(404, "Order not found")

    order.status = OrderStatus(body.status)
    order.updated_at = datetime.now()
    await db.flush()

    await notify_user_status_changed(db, order_id)

    return _to_dto(order)


@router.delete("/{order_id}", status_code=204)
async def delete_order(order_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Order).where(Order.id == order_id))
    order = result.scalars().first()
    if order:
        await db.delete(order)
