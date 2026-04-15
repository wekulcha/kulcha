import hashlib
import hmac as _hmac
import time

import httpx
from aiogram import Router, F
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.filters import CommandStart

from config import API_BASE, BOT_API_SECRET, BOT_TOKEN, SUPPORT_LINK, USER_MINI_APP_BASE
from keyboards import main_menu_keyboard, request_phone_keyboard

router = Router()


def _bot_headers() -> dict:
    h = {}
    if BOT_API_SECRET:
        h["X-Kulcha-Bot-Secret"] = BOT_API_SECRET
    return h


def _generate_bot_auth_token(telegram_id: int, ttl: int = 600) -> str:
    """
    Генерирует stateless HMAC-токен вида {telegramId}_{expiry}_{hmac}.
    Бэкенд верифицирует его через POST /auth/verify-user-bot-token.
    Работает в любом браузере, не требует Telegram WebView.
    """
    expiry = int(time.time()) + ttl
    data = f"{telegram_id}_{expiry}"
    sig = _hmac.new(BOT_TOKEN.encode(), data.encode(), hashlib.sha256).hexdigest()
    return f"{telegram_id}_{expiry}_{sig}"


def _webapp_inline(text: str, url: str, telegram_id: int) -> InlineKeyboardMarkup:
    """InlineKeyboardButton с web_app + tg_auth токен в URL."""
    if BOT_TOKEN and "?" not in url:
        token = _generate_bot_auth_token(telegram_id)
        full_url = f"{url}?tg_auth={token}"
    elif BOT_TOKEN:
        token = _generate_bot_auth_token(telegram_id)
        full_url = f"{url}&tg_auth={token}"
    else:
        full_url = url
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(text=text, web_app=WebAppInfo(url=full_url))
    ]])


@router.message(CommandStart())
async def cmd_start(message: Message):
    user_id = message.from_user.id
    username = message.from_user.username or f"tg_{user_id}"
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(f"{API_BASE}/users", params={"telegramId": user_id})
            if r.status_code == 200 and r.json():
                await message.answer(
                    "<b>Добро пожаловать в KULCHA!</b>\n"
                    "━━━━━━━━━━━━━━\n"
                    "Рады снова вас видеть. Выберите действие:",
                    reply_markup=main_menu_keyboard(user_id),
                )
                return
        except Exception:
            pass
    await message.answer(
        "<b>KULCHA</b> · доставка и зал\n"
        "━━━━━━━━━━━━━━\n"
        "Чтобы оформлять заказы, нужен один раз поделиться <b>номером телефона</b> "
        "(кнопка ниже). Мы сохраним телефон, ник в Telegram и ваш ID.",
        reply_markup=request_phone_keyboard(),
    )


@router.message(F.contact)
async def on_contact(message: Message):
    if not message.contact:
        return
    user_id = message.from_user.id
    phone = message.contact.phone_number or ""
    username = message.from_user.username or f"tg_{user_id}"
    async with httpx.AsyncClient() as client:
        try:
            r = await client.post(
                f"{API_BASE}/users",
                headers={**_bot_headers(), "Content-Type": "application/json"},
                json={
                    "username": username,
                    "phone": phone,
                    "telegramId": user_id,
                    "email": None,
                    "address": None,
                },
            )
            if r.status_code in (200, 201):
                await message.answer(
                    "<b>Готово!</b>\n"
                    "━━━━━━━━━━━━━━\n"
                    "Регистрация прошла успешно. Теперь можно заказывать через "
                    "<b>«Заказать»</b> — откроется мини-приложение с вашим профилем.",
                    reply_markup=main_menu_keyboard(user_id),
                )
            else:
                await message.answer(
                    "Не удалось сохранить профиль. Попробуйте позже или напишите в поддержку.",
                    reply_markup=main_menu_keyboard(user_id),
                )
        except Exception as e:
            await message.answer(
                f"Ошибка сети: <code>{e}</code>",
                reply_markup=main_menu_keyboard(user_id),
            )


@router.message(F.text == "🍽 Заказать")
async def order_cafes(message: Message):
    uid = message.from_user.id
    if USER_MINI_APP_BASE.startswith("https://"):
        await message.answer(
            "Нажмите кнопку, чтобы открыть меню ресторанов:",
            reply_markup=_webapp_inline("🍽 Открыть меню", f"{USER_MINI_APP_BASE}/cafes", uid),
        )
    else:
        await message.answer(f"Откройте в браузере: {USER_MINI_APP_BASE}/cafes")


@router.message(F.text == "🧺 Корзина")
async def cart(message: Message):
    uid = message.from_user.id
    if USER_MINI_APP_BASE.startswith("https://"):
        await message.answer(
            "Нажмите кнопку, чтобы открыть корзину:",
            reply_markup=_webapp_inline("🧺 Открыть корзину", f"{USER_MINI_APP_BASE}/cart", uid),
        )
    else:
        await message.answer(f"Откройте в браузере: {USER_MINI_APP_BASE}/cart")


@router.message(F.text == "👤 Профиль")
async def profile(message: Message):
    uid = message.from_user.id
    if USER_MINI_APP_BASE.startswith("https://"):
        await message.answer(
            "Нажмите кнопку, чтобы открыть профиль:",
            reply_markup=_webapp_inline("👤 Открыть профиль", f"{USER_MINI_APP_BASE}/profile", uid),
        )
    else:
        await message.answer(f"Откройте в браузере: {USER_MINI_APP_BASE}/profile")


@router.message(F.text == "📦 Статус заказа")
async def order_status(message: Message):
    await message.answer(
        "<b>Статус заказа</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Мы присылаем обновления в этот чат после оформления. "
        "Также загляните в мини-приложение → «Профиль»."
    )


@router.message(F.text == "💬 Поддержка")
async def support(message: Message):
    await message.answer(
        f"<b>Поддержка</b>\n━━━━━━━━━━━━━━\nНапишите нам: {SUPPORT_LINK}"
    )
