import hashlib
import hmac
import time
from typing import Optional

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

from config import BOT_TOKEN, USER_MINI_APP_BASE, SUPPORT_LINK

# Telegram принимает только HTTPS для Web App. Для localhost (http) используем обычные кнопки.
_USE_WEB_APP = USER_MINI_APP_BASE.startswith("https://")


def _generate_bot_auth_token(telegram_id: int, ttl: int = 3600) -> str:
    expiry = int(time.time()) + ttl
    data = f"{telegram_id}_{expiry}"
    sig = hmac.new(BOT_TOKEN.encode(), data.encode(), hashlib.sha256).hexdigest()
    return f"{telegram_id}_{expiry}_{sig}"


def _webapp_url(path: str, telegram_id: Optional[int]) -> str:
    base = f"{USER_MINI_APP_BASE}{path}"
    if not BOT_TOKEN or telegram_id is None:
        return base
    token = _generate_bot_auth_token(telegram_id)
    sep = "&" if "?" in base else "?"
    return f"{base}{sep}tg_auth={token}"


def main_menu_keyboard(telegram_id: Optional[int] = None) -> ReplyKeyboardMarkup:
    if _USE_WEB_APP:
        return ReplyKeyboardMarkup(
            keyboard=[
                [KeyboardButton(text="🍽 Заказать", web_app=WebAppInfo(url=_webapp_url("/cafes", telegram_id)))],
                [
                    KeyboardButton(text="🧺 Корзина", web_app=WebAppInfo(url=_webapp_url("/cart", telegram_id))),
                    KeyboardButton(text="👤 Профиль", web_app=WebAppInfo(url=_webapp_url("/profile", telegram_id))),
                ],
                [KeyboardButton(text="📦 Статус заказа")],
                [KeyboardButton(text="💬 Поддержка", url=SUPPORT_LINK)],
            ],
            resize_keyboard=True,
            input_field_placeholder="Выберите действие",
        )
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="🍽 Заказать")],
            [KeyboardButton(text="🧺 Корзина"), KeyboardButton(text="👤 Профиль")],
            [KeyboardButton(text="📦 Статус заказа")],
            [KeyboardButton(text="💬 Поддержка", url=SUPPORT_LINK)],
        ],
        resize_keyboard=True,
        input_field_placeholder="Выберите действие",
    )


def request_phone_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📱 Отправить номер", request_contact=True)],
        ],
        resize_keyboard=True,
        one_time_keyboard=True,
    )
