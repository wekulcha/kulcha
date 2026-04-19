import hashlib
import html
import hmac as _hmac
import time

import httpx
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.filters import CommandStart

from config import ADMIN_MINI_APP_URL, API_BASE, BOT_TOKEN, INTERNAL_API_SECRET, SUPPORT_LINK
from keyboards import main_menu_keyboard
from order_keyboard import order_status_keyboard


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

STATUS_RU = {
    "CREATED": "Создан",
    "ACCEPTED": "Принят",
    "COOKING": "Готовится",
    "DELIVERY": "В доставке",
    "DONE": "Выполнен",
    "CANCELLED": "Отменён",
}


def _apply_status_change_meta(
    source_html: str,
    *,
    order_id: int,
    status_ru: str,
    actor: str,
) -> str:
    lines = source_html.split("\n")
    updated: list[str] = []
    replaced_number = False
    for ln in lines:
        if ln.startswith(f"№ <code>{order_id}</code>"):
            updated.append(f"№ <code>{order_id}</code> · <b>{status_ru}</b>")
            replaced_number = True
            continue
        if "Статус ещё не меняли" in ln or "Статус изменил:" in ln or "Выберите статус ниже" in ln:
            continue
        updated.append(ln)
    if not replaced_number:
        updated.insert(2, f"№ <code>{order_id}</code> · <b>{status_ru}</b>")
    updated.append(f"<i>Статус изменил: {html.escape(actor)}</i>")
    return "\n".join(updated)


@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.answer(
        "<b>Панель ресторана KULCHA</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Здесь приходят <b>новые заказы</b> и кнопки смены статуса. "
        "Управление меню и аналитика — в мини-приложении.",
        reply_markup=main_menu_keyboard(),
    )


@router.message(F.text == "📥 Активные заказы")
async def active_orders(message: Message):
    if ADMIN_MINI_APP_URL.startswith("https://"):
        uid = message.from_user.id
        token = _generate_bot_auth_token(uid) if BOT_TOKEN else None
        url = f"{ADMIN_MINI_APP_URL}?tg_auth={token}" if token else ADMIN_MINI_APP_URL
        await message.answer(
            "<b>Активные заказы</b>\n"
            "━━━━━━━━━━━━━━\n"
            "Откройте вкладку «Заказы» в панели:",
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text="📋 Открыть заказы",
                            web_app=WebAppInfo(url=url),
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
                    data = r.json() if r.content else {}
                    st = str(data.get("status") or "")
                    new_kb = order_status_keyboard(order_id, st)
                    who = query.from_user
                    who_name = f"@{who.username}" if who and who.username else f"id:{who.id if who else '—'}"
                    base_text = query.message.html_text or query.message.text or ""
                    if base_text:
                        new_text = _apply_status_change_meta(
                            base_text,
                            order_id=order_id,
                            status_ru=STATUS_RU.get(st, st),
                            actor=who_name,
                        )
                        await query.message.edit_text(new_text, reply_markup=new_kb)
                    else:
                        await query.message.edit_reply_markup(reply_markup=new_kb)
                except Exception:
                    pass
        else:
            await query.answer(f"Ошибка API: {r.status_code}", show_alert=True)
    except Exception as e:
        await query.answer(f"Ошибка: {e}", show_alert=True)
