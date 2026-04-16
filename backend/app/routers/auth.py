from __future__ import annotations

import hashlib
import hmac
import logging
import time
from collections.abc import Mapping
from datetime import datetime

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_db
from app.models.staff import Staff
from app.models.user import User
from app.schemas.admin import AdminWebAppSessionDto
from app.schemas.user import UserDto, UserRestaurantDto
from app.services.telegram_auth import verify_telegram_init_data

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


def _to_user_dto(u: User) -> UserDto:
    return UserDto(
        id=u.id,
        username=u.username,
        phone=u.phone,
        email=u.email,
        address=u.address,
        registeredAt=u.registered_at,
    )


async def _ensure_customer(db: AsyncSession, telegram_id: int, username: str | None) -> User:
    result = await db.execute(select(User).where(User.id == telegram_id))
    user = result.scalars().first()
    if user:
        return user
    user = User(
        id=telegram_id,
        username=username or f"tg_{telegram_id}",
        phone=f"tg-{telegram_id}",
        registered_at=datetime.now(),
    )
    db.add(user)
    await db.flush()
    return user


async def _list_restaurants_for_staff(db: AsyncSession, user_id: int) -> list[UserRestaurantDto]:
    from sqlalchemy.orm import joinedload
    result = await db.execute(
        select(Staff)
        .options(joinedload(Staff.restaurant))
        .where(Staff.user_id == user_id)
    )
    staff_list = result.unique().scalars().all()

    grouped: dict[int, list[Staff]] = {}
    for s in staff_list:
        grouped.setdefault(s.restaurant_id, []).append(s)

    restaurants = []
    for assignments in grouped.values():
        first = assignments[0]
        restaurants.append(UserRestaurantDto(
            id=first.restaurant.id,
            name=first.restaurant.name,
            address=first.restaurant.address,
            permissions=list({s.permission.value for s in assignments}),
        ))
    restaurants.sort(key=lambda r: r.name)
    return restaurants


def _verify_bot_token(token: str, bot_token: str) -> int:
    """Verify bot-generated HMAC token: {telegramId}_{expiry}_{hmac}."""
    if not token:
        raise HTTPException(401, "Missing bot auth token")
    if not bot_token:
        raise HTTPException(503, "Bot token not configured")

    parts = token.split("_", 2)
    if len(parts) != 3:
        raise HTTPException(401, "Malformed bot auth token")

    try:
        telegram_id = int(parts[0])
        expiry = int(parts[1])
    except ValueError:
        raise HTTPException(401, "Malformed bot auth token")

    now = int(time.time())
    if now > expiry:
        raise HTTPException(401, "Bot auth token expired")

    data = f"{parts[0]}_{parts[1]}"
    expected = hmac.new(
        bot_token.encode(),
        data.encode(),
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(expected.lower(), parts[2].lower()):
        raise HTTPException(401, "Invalid bot auth token signature")

    return telegram_id


@router.post("/webapp-user")
async def webapp_user(
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
):
    init = (x_telegram_init_data or x_init_data or "").strip()
    if not init:
        logger.warning("webapp-user: no init data header received")
        raise HTTPException(401, "Missing Telegram WebApp data")

    settings = get_settings()
    if not settings.user_bot_token:
        logger.error("webapp-user: KULCHA_USER_BOT_TOKEN is not configured")
        raise HTTPException(503, "KULCHA_USER_BOT_TOKEN is not configured")

    tg_user = verify_telegram_init_data(init, settings.user_bot_token)
    if not tg_user:
        logger.warning("webapp-user: initData validation failed (len=%d)", len(init))
        raise HTTPException(401, "Invalid Telegram init data")

    tid = tg_user.get("id")
    if tid is None:
        raise HTTPException(401, "No user id in init data")

    logger.info("webapp-user: authenticated telegram_id=%s", tid)
    user = await _ensure_customer(db, int(tid), tg_user.get("username"))
    return _to_user_dto(user)


@router.post("/webapp-admin")
async def webapp_admin(
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
):
    init = (x_telegram_init_data or x_init_data or "").strip()
    if not init:
        logger.warning("webapp-admin: no init data header received")
        raise HTTPException(401, "Missing Telegram WebApp data")

    settings = get_settings()
    if not settings.admin_bot_token:
        logger.error("webapp-admin: KULCHA_ADMIN_BOT_TOKEN is not configured")
        raise HTTPException(503, "KULCHA_ADMIN_BOT_TOKEN is not configured")

    tg_user = verify_telegram_init_data(init, settings.admin_bot_token)
    if not tg_user:
        logger.warning("webapp-admin: initData validation failed (len=%d)", len(init))
        raise HTTPException(401, "Invalid Telegram init data")

    tid = tg_user.get("id")
    if tid is None:
        raise HTTPException(401, "No user id in init data")

    logger.info("webapp-admin: authenticated telegram_id=%s", tid)

    result = await db.execute(select(User).where(User.id == int(tid)))
    user = result.scalars().first()
    if not user:
        user = await _ensure_customer(db, int(tid), tg_user.get("username"))

    restaurants = await _list_restaurants_for_staff(db, user.id)
    if not restaurants:
        raise HTTPException(403, "Нет доступа к ресторанам")

    return AdminWebAppSessionDto(user=_to_user_dto(user), restaurants=restaurants)


@router.post("/verify-user-bot-token")
async def verify_user_bot_token(
    body: Mapping,
    db: AsyncSession = Depends(get_db),
):
    token = body.get("token") if body else None
    settings = get_settings()
    telegram_id = _verify_bot_token(token, settings.user_bot_token)
    user = await _ensure_customer(db, telegram_id, None)
    return _to_user_dto(user)


@router.post("/verify-admin-bot-token")
async def verify_admin_bot_token(
    body: Mapping,
    db: AsyncSession = Depends(get_db),
):
    token = body.get("token") if body else None
    settings = get_settings()
    telegram_id = _verify_bot_token(token, settings.admin_bot_token)

    result = await db.execute(select(User).where(User.id == telegram_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(403, "Пользователь не найден. Добавьте сотрудника в ресторане.")

    restaurants = await _list_restaurants_for_staff(db, user.id)
    if not restaurants:
        raise HTTPException(403, "Нет доступа к ресторанам")

    return AdminWebAppSessionDto(user=_to_user_dto(user), restaurants=restaurants)
