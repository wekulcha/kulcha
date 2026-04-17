from __future__ import annotations

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.config import get_settings
from app.database import get_db
from app.models.enums import MealCategory
from app.models.meal import Meal
from app.models.restaurant import Restaurant
from app.models.user import User
from app.schemas.meal import MealDto
from app.schemas.restaurant import RestaurantDto, RestaurantPatchDto
from app.services import staff_access
from app.services.telegram_auth import verify_telegram_init_data

router = APIRouter(prefix="/api/v1/restaurants", tags=["restaurants"])


def _to_dto(r: Restaurant) -> RestaurantDto:
    return RestaurantDto(
        id=r.id,
        name=r.name,
        address=r.address,
        imageLink=r.image_link,
    )


def _meal_dto(m: Meal) -> MealDto:
    return MealDto(
        id=m.id, restaurantId=m.restaurant_id, name=m.name,
        description=m.description, weight=m.weight, calorie=m.calorie,
        imageLink=m.image_link, category=m.category.value if m.category else None,
        price=m.price, available=m.is_available,
    )


@router.get("")
async def get_all(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant))
    return [_to_dto(r) for r in result.scalars().all()]


@router.get("/{restaurant_id}")
async def get_by_id(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant).where(Restaurant.id == restaurant_id))
    r = result.scalars().first()
    if not r:
        raise HTTPException(404, "Restaurant not found")
    return _to_dto(r)


@router.patch("/{restaurant_id}")
async def patch_restaurant(
    restaurant_id: int,
    body: RestaurantPatchDto,
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str = Header(..., alias="X-Telegram-Init-Data"),
):
    settings = get_settings()
    tg = verify_telegram_init_data(x_telegram_init_data, settings.admin_bot_token)
    if not tg:
        raise HTTPException(401, "Invalid Telegram init data")
    result = await db.execute(select(User).where(User.id == tg["id"]))
    u = result.scalars().first()
    if not u:
        raise HTTPException(403, "Unknown user")
    await staff_access.require_can_edit_menu(db, u.id, restaurant_id)

    result = await db.execute(select(Restaurant).where(Restaurant.id == restaurant_id))
    r = result.scalars().first()
    if not r:
        raise HTTPException(404, "Restaurant not found")

    if body.name is not None:
        r.name = body.name.strip()
    if body.address is not None:
        r.address = body.address.strip()
    if body.imageLink is not None:
        r.image_link = body.imageLink.strip() or None
    await db.flush()
    return _to_dto(r)


@router.get("/{restaurant_id}/meals")
async def get_meals(
    restaurant_id: int,
    category: str | None = None,
    availableOnly: bool = True,
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
):
    result = await db.execute(select(Restaurant).where(Restaurant.id == restaurant_id))
    if not result.scalars().first():
        raise HTTPException(404, "Restaurant not found")

    if not availableOnly:
        if not x_telegram_init_data:
            raise HTTPException(401, "Telegram init data required")
        settings = get_settings()
        tg = verify_telegram_init_data(x_telegram_init_data, settings.admin_bot_token)
        if not tg:
            raise HTTPException(401, "Invalid Telegram init data")
        result = await db.execute(select(User).where(User.id == tg["id"]))
        u = result.scalars().first()
        if not u:
            raise HTTPException(403, "Unknown user")
        await staff_access.require_restaurant_staff(db, u.id, restaurant_id)

    query = select(Meal).where(Meal.restaurant_id == restaurant_id)
    if availableOnly:
        query = query.where(Meal.is_available == True)  # noqa: E712
    if category:
        try:
            cat = MealCategory(category)
        except ValueError:
            raise HTTPException(400, f"Invalid category: {category}")
        query = query.where(Meal.category == cat)

    result = await db.execute(query)
    return [_meal_dto(m) for m in result.scalars().all()]
