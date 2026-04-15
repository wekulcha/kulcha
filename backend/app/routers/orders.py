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
from app.services.telegram_auth import verify_telegram_init_data
from app.services.telegram_notifier import notify_order_placed, notify_user_status_changed

router = APIRouter(prefix="/api/v1/orders", tags=["orders"])


def _to_dto(o: Order) -> OrderDto:
    return OrderDto(
        id=o.id, status=o.status.value, userId=o.user_id,
        deliveryAddress=o.delivery_address, restaurantId=o.restaurant_id,
        createdAt=o.created_at, updatedAt=o.updated_at,
        courierId=o.courier_id, orderType=o.order_type.value,
        itemsTotal=o.items_total, deliveryFee=o.delivery_fee,
        serviceFee=o.service_fee, total=o.total,
    )


async def _require_customer_id(db: AsyncSession, init_data: str) -> int:
    settings = get_settings()
    tg = verify_telegram_init_data(init_data, settings.user_bot_token)
    if not tg:
        raise HTTPException(401, "Invalid Telegram init data")
    tid = tg["id"]
    result = await db.execute(select(User).where(User.id == tid))
    user = result.scalars().first()
    if user:
        return user.id
    user = User(
        id=tid,
        username=tg.get("username") or f"tg_{tid}",
        phone=f"tg-{tid}",
        registered_at=datetime.now(),
    )
    db.add(user)
    await db.flush()
    return user.id


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
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
):
    if userId is not None:
        db_id = await _require_customer_id(db, x_telegram_init_data or "")
        if db_id != userId:
            raise HTTPException(403, "Cannot read other users orders")
        result = await db.execute(
            select(Order)
            .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
            .where(Order.user_id == userId)
        )
        return [_to_dto(o) for o in result.unique().scalars().all()]

    if restaurantId is not None:
        admin = await _require_admin_user(db, x_telegram_init_data or "")
        await staff_access.require_restaurant_staff(db, admin.id, restaurantId)
        result = await db.execute(
            select(Order)
            .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
            .where(Order.restaurant_id == restaurantId)
        )
        return [_to_dto(o) for o in result.unique().scalars().all()]

    if status is not None:
        try:
            s = OrderStatus(status)
        except ValueError:
            raise HTTPException(400, f"Invalid status: {status}")
        result = await db.execute(
            select(Order)
            .options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
            .where(Order.status == s)
        )
        return [_to_dto(o) for o in result.unique().scalars().all()]

    result = await db.execute(
        select(Order).options(joinedload(Order.user), joinedload(Order.restaurant), joinedload(Order.courier))
    )
    return [_to_dto(o) for o in result.unique().scalars().all()]


@router.get("/{order_id}")
async def get_by_id(
    order_id: int,
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
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

    if not x_telegram_init_data:
        raise HTTPException(401, "Telegram init data required")

    try:
        admin = await _require_admin_user(db, x_telegram_init_data)
        await staff_access.require_restaurant_staff(db, admin.id, order.restaurant_id)
        return _to_dto(order)
    except HTTPException as ex:
        if ex.status_code != 401:
            raise

    db_id = await _require_customer_id(db, x_telegram_init_data)
    if order.user_id != db_id:
        raise HTTPException(403, "Forbidden")
    return _to_dto(order)


@router.post("/checkout", status_code=201)
async def checkout(
    body: OrderCheckoutRequest,
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str = Header(..., alias="X-Telegram-Init-Data"),
):
    db_user_id = await _require_customer_id(db, x_telegram_init_data)

    if not body.items:
        raise HTTPException(400, "Invalid checkout payload")

    order = Order(
        status=OrderStatus.CREATED,
        user_id=db_user_id,
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
        unit = line.unitPrice if line.unitPrice is not None else meal.price
        line_total = unit * line.quantity

        pos = OrderPosition(
            meal_id=meal.id, order_id=order.id,
            quantity=line.quantity, unit_price=unit, total_price=line_total,
        )
        db.add(pos)

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
