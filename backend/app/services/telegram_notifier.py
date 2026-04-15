from __future__ import annotations

import html
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.config import get_settings
from app.models.enums import OrderStatus
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


def _esc(s: str | None) -> str:
    return html.escape(s or "")


def _status_ru(status: OrderStatus | str) -> str:
    return _STATUS_RU.get(str(status), str(status))


def _format_user_new_order(order: Order, lines: list[OrderPosition]) -> str:
    parts = [
        "🍽 <b>Заказ оформлен</b>",
        "━━━━━━━━━━━━━━",
        f"№ <code>{order.id}</code>",
        f"📍 {_esc(order.restaurant.name)}",
        f"📌 Статус: <b>{_status_ru(order.status)}</b>",
        f"💰 Сумма: <b>{order.total} ₽</b>",
        "",
        "<b>Состав:</b>",
    ]
    for p in lines:
        parts.append(f"• {_esc(p.meal.name)} × {p.quantity} — {p.total_price} ₽")
    if order.delivery_address:
        parts.append(f"\n🚚 Адрес: {_esc(order.delivery_address)}")
    parts.append("\n<i>Мы пришлём обновление, когда статус изменится.</i>")
    return "\n".join(parts)


def _format_admin_new_order(order: Order, lines: list[OrderPosition]) -> str:
    user = order.user
    parts = [
        "🔔 <b>Новый заказ</b>",
        "━━━━━━━━━━━━━━",
        f"№ <code>{order.id}</code>",
        f"👤 {_esc(user.username)} · {_esc(user.phone)}",
        f"📍 {_esc(order.restaurant.name)}",
        f"🧾 {order.order_type}",
        f"💰 <b>{order.total} ₽</b>",
        "",
        "<b>Позиции:</b>",
    ]
    for p in lines:
        parts.append(f"• {_esc(p.meal.name)} × {p.quantity}")
    if order.delivery_address:
        parts.append(f"\n🚚 {_esc(order.delivery_address)}")
    parts.append("\n<i>Выберите статус ниже ↓</i>")
    return "\n".join(parts)


def _format_user_status_update(order: Order) -> str:
    return (
        "📦 <b>Обновление заказа</b>\n"
        "━━━━━━━━━━━━━━\n"
        f"№ <code>{order.id}</code>\n"
        f"📍 {_esc(order.restaurant.name)}\n"
        f"📌 Новый статус: <b>{_status_ru(order.status)}</b>\n"
        f"💰 {order.total} ₽\n"
    )


def _build_admin_keyboard(order_id: int) -> dict:
    def _btn(text: str, code: str) -> list[dict]:
        return [{"text": text, "callback_data": f"k:{order_id}:{code}"}]

    return {
        "inline_keyboard": [
            _btn("✅ Принят", "ACC"),
            _btn("👨‍🍳 Готовится", "COO"),
            _btn("🚚 Доставка", "DEL"),
            _btn("✔️ Готово", "DON"),
            _btn("❌ Отмена", "CAN"),
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
        msg = _format_user_new_order(order, lines)
        await telegram_bot_client.send_message(user_token, order.user.id, msg)

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
            await telegram_bot_client.send_message(admin_token, s.user.id, admin_html, reply_markup=keyboard)


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

    msg = _format_user_status_update(order)
    await telegram_bot_client.send_message(user_token, order.user.id, msg)
