from __future__ import annotations

import html
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.config import get_settings
from app.models.order import Order
from app.models.order_position import OrderPosition
from app.models.staff import Staff
from app.services import telegram_bot_client


_STATUS_RU: dict[str, str] = {
    "CREATED": "Создан",
    "ACCEPTED": "Принят",
    "COOKING": "Готовится",
    "DELIVERY": "Доставка",
    "DONE": "Выполнен",
    "CANCELLED": "Отменён",
}

_ORDER_TYPE_RU: dict[str, str] = {
    "DELIVERY": "Доставка",
    "DINE_IN": "В зале",
}


def _esc(s: str | None) -> str:
    return html.escape(s or "")


def _enum_key(v: object) -> str:
    if hasattr(v, "value"):
        return str(getattr(v, "value"))
    return str(v)


def _status_ru(status: object) -> str:
    return _STATUS_RU.get(_enum_key(status), _enum_key(status))


def _order_type_ru(ot: object) -> str:
    return _ORDER_TYPE_RU.get(_enum_key(ot), _enum_key(ot))


def _username_at(username: str | None) -> str:
    if not username:
        return "—"
    u = username.strip()
    if u.startswith("@"):
        return u
    return f"@{u}"


def _phone_clickable(phone: str | None) -> str:
    """Текст для HTML: ссылка tel: с +"""
    if not phone:
        return "—"
    p = phone.strip()
    if p.startswith("tg-"):
        return _esc(p)
    digits = "".join(c for c in p if c.isdigit() or c == "+")
    if not digits:
        return _esc(p)
    if digits.startswith("+"):
        tel = digits
        show = digits
    else:
        tel = f"+{digits}"
        show = tel
    return f'<a href="tel:{_esc(tel)}">{_esc(show)}</a>'


def _user_tg_link(username: str | None, telegram_id: int) -> str:
    """Ссылка на пользователя для курьера: t.me/username или tg://user?id=…"""
    if username:
        u = username.strip().lstrip("@")
        if u:
            return f'<a href="https://t.me/{_esc(u)}">@{_esc(u)}</a>'
    return f'<a href="tg://user?id={telegram_id}">id:{telegram_id}</a>'


def _format_user_order_block(
    order: Order,
    lines: list[OrderPosition],
    title: str,
    *,
    is_update: bool = False,
) -> str:
    parts = [
        f"🍽 <b>{_esc(title)}</b>",
        "━━━━━━━━━━━━━━",
        f"№ <code>{order.id}</code>",
        f"📍 {_esc(order.restaurant.name)}",
        f"📌 Статус: <b>{_status_ru(order.status)}</b>",
        f"🧾 {_order_type_ru(order.order_type)}",
        f"💰 Сумма: <b>{order.total} ₽</b>",
        "",
        "<b>Состав:</b>",
    ]
    for p in lines:
        parts.append(f"• {_esc(p.meal.name)} × {p.quantity} — {p.total_price} ₽")
    if order.delivery_address:
        parts.append(f"\n🚚 Адрес: {_esc(order.delivery_address)}")
    if order.table_number:
        parts.append(f"\n🪑 Стол: <b>{_esc(order.table_number)}</b>")
    if is_update:
        parts.append("\n<i>Статус обновлён. При следующем изменении пришлём новое сообщение.</i>")
    else:
        parts.append("\n<i>Мы пришлём обновление, когда статус изменится.</i>")
    return "\n".join(parts)


def _format_admin_new_order(order: Order, lines: list[OrderPosition]) -> str:
    user = order.user
    uname = _user_tg_link(user.username, user.id)
    phone = _phone_clickable(user.phone)
    parts = [
        "🔔 <b>Новый заказ</b>",
        "━━━━━━━━━━━━━━",
        f"№ <code>{order.id}</code>",
        f"👤 {uname} · {phone}",
        f"📍 {_esc(order.restaurant.name)}",
        f"🧾 {_order_type_ru(order.order_type)}",
        f"💰 <b>{order.total} ₽</b>",
        "",
        "<b>Позиции:</b>",
    ]
    for p in lines:
        parts.append(f"• {_esc(p.meal.name)} × {p.quantity}")
    if order.delivery_address:
        parts.append(f"\n🚚 {_esc(order.delivery_address)}")
    if order.table_number:
        parts.append(f"\n🪑 Стол: <b>{_esc(order.table_number)}</b>")
    parts.append("\n<i>Выберите статус ниже ↓</i>")
    return "\n".join(parts)


def _build_admin_keyboard(order_id: int) -> dict:
    """Новый заказ: отмена слева, принят справа. Дальше клавиатура обновляется из бота по статусу."""
    return {
        "inline_keyboard": [
            [
                {"text": "❌ Отмена", "callback_data": f"k:{order_id}:CAN"},
                {"text": "✅ Принят", "callback_data": f"k:{order_id}:ACC"},
            ]
        ]
    }


async def notify_order_placed(db: AsyncSession, order_id: int) -> None:
    settings = get_settings()

    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant))
        .where(Order.id == order_id)
    )
    order = result.unique().scalar_one_or_none()
    if not order:
        return

    lines_result = await db.execute(
        select(OrderPosition)
        .options(joinedload(OrderPosition.meal))
        .where(OrderPosition.order_id == order_id)
    )
    lines = list(lines_result.unique().scalars().all())

    user_token = settings.user_bot_token
    if user_token:
        msg = _format_user_order_block(order, lines, "Заказ оформлен", is_update=False)
        mid = await telegram_bot_client.send_message(user_token, order.user.id, msg)
        if mid is not None:
            order.user_telegram_notify_message_id = mid
            await db.flush()

    admin_token = settings.admin_bot_token
    if admin_token:
        admin_html = _format_admin_new_order(order, lines)
        keyboard = _build_admin_keyboard(order.id)

        staff_result = await db.execute(
            select(Staff)
            .options(joinedload(Staff.user))
            .where(Staff.restaurant_id == order.restaurant_id)
        )
        staff_list = staff_result.unique().scalars().all()
        for s in staff_list:
            await telegram_bot_client.send_message(
                admin_token, s.user.id, admin_html, reply_markup=keyboard
            )


async def notify_user_status_changed(db: AsyncSession, order_id: int) -> None:
    settings = get_settings()
    user_token = settings.user_bot_token
    if not user_token:
        return

    result = await db.execute(
        select(Order)
        .options(joinedload(Order.user), joinedload(Order.restaurant))
        .where(Order.id == order_id)
    )
    order = result.unique().scalar_one_or_none()
    if not order:
        return

    lines_result = await db.execute(
        select(OrderPosition)
        .options(joinedload(OrderPosition.meal))
        .where(OrderPosition.order_id == order_id)
    )
    lines = list(lines_result.unique().scalars().all())

    chat_id = order.user.id
    old_mid = order.user_telegram_notify_message_id
    if old_mid:
        await telegram_bot_client.delete_message(user_token, chat_id, old_mid)

    msg = _format_user_order_block(order, lines, "Обновление заказа", is_update=True)
    mid = await telegram_bot_client.send_message(user_token, chat_id, msg)
    if mid is not None:
        order.user_telegram_notify_message_id = mid
        await db.flush()
