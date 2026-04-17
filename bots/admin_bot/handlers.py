import hashlib
import hmac as _hmac
import time

import httpx
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.filters import CommandStart

from config import ADMIN_MINI_APP_URL, API_BASE, BOT_TOKEN, INTERNAL_API_SECRET, SUPPORT_LINK
from keyboards import main_menu_keyboard


def _generate_bot_auth_token(telegram_id: int, ttl: int = 600) -> str:
    """Генерирует stateless HMAC-токен для верификации через POST /auth/verify-admin-bot-token."""
    expiry = int(time.time()) + ttl
    data = f"{telegram_id}_{expiry}"
    sig = _hmac.new(BOT_TOKEN.encode(), data.encode(), hashlib.sha256).hexdigest()
    return f"{telegram_id}_{expiry}_{sig}"

router = Router()

STATUS_FROM_CB = {
    "ACC": "ACCEPTED",
    "COO": "COOKING",
    "DEL": "DELIVERY",
    "DON": "DONE",
    "CAN": "CANCELLED",
}


@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.answer(
        "<b>Панель ресторана KULCHA</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Здесь приходят <b>новые заказы</b> и кнопки смены статуса. "
        "Управление меню и аналитика — в мини-приложении.",
        reply_markup=main_menu_keyboard(),
    )


@router.message(F.text == "🍽 Открыть панель")
async def open_panel(message: Message):
    if ADMIN_MINI_APP_URL.startswith("https://"):
        uid = message.from_user.id
        token = _generate_bot_auth_token(uid) if BOT_TOKEN else None
        url = f"{ADMIN_MINI_APP_URL}?tg_auth={token}" if token else ADMIN_MINI_APP_URL
        await message.answer(
            "Нажмите кнопку, чтобы открыть панель управления:",
            reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
                InlineKeyboardButton(text="🍽 Открыть панель", web_app=WebAppInfo(url=url))
            ]]),
        )
    else:
        await message.answer(
            f"<b>Локальная панель</b>\nОткройте в браузере:\n<code>{ADMIN_MINI_APP_URL}</code>"
        )


@router.message(F.text == "📥 Активные заказы")
async def active_orders(message: Message):
    if ADMIN_MINI_APP_URL.startswith("https://"):
        await message.answer(
            "<b>Активные заказы</b>\n"
            "━━━━━━━━━━━━━━\n"
            "Откройте вкладку «Заказы» в панели:",
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text="📋 Открыть заказы",
                            web_app=WebAppInfo(url=ADMIN_MINI_APP_URL),
                        )
                    ]
                ]
            ),
        )
    else:
        await message.answer(
            "<b>Активные заказы</b>\n━━━━━━━━━━━━━━\n"
            f"Откройте в браузере:\n<code>{ADMIN_MINI_APP_URL}</code>"
        )


@router.message(F.text == "📊 Итоги за сегодня")
async def today_summary(message: Message):
    await message.answer(
        "<b>Итоги</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Графики и выручка — во вкладке «Аналитика» в мини-приложении."
    )


@router.message(F.text == "💬 Поддержка")
async def support(message: Message):
    await message.answer(f"<b>Поддержка</b>\n━━━━━━━━━━━━━━\n{SUPPORT_LINK}")


@router.callback_query(F.data.startswith("k:"))
async def order_status_callback(query: CallbackQuery):
    if not INTERNAL_API_SECRET:
        await query.answer("Не задан KULCHA_INTERNAL_API_SECRET", show_alert=True)
        return
    parts = query.data.split(":")
    if len(parts) != 3:
        await query.answer()
        return
    try:
        order_id = int(parts[1])
    except ValueError:
        await query.answer()
        return
    code = parts[2]
    status = STATUS_FROM_CB.get(code)
    if not status:
        await query.answer("Неизвестный код", show_alert=True)
        return
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            r = await client.patch(
                f"{API_BASE}/orders/{order_id}/status",
                headers={
                    "X-Kulcha-Internal-Secret": INTERNAL_API_SECRET,
                    "Content-Type": "application/json",
                },
                json={"status": status},
            )
        if r.status_code == 200:
            await query.answer("Статус обновлён ✓")
            if query.message:
                try:
                    await query.message.edit_reply_markup(reply_markup=None)
                except Exception:
                    pass
        else:
            await query.answer(f"Ошибка API: {r.status_code}", show_alert=True)
    except Exception as e:
        await query.answer(f"Ошибка: {e}", show_alert=True)
