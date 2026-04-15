import hashlib
import hmac
import time
from typing import Optional

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

from config import ADMIN_MINI_APP_URL, BOT_TOKEN, SUPPORT_LINK


def _generate_bot_auth_token(telegram_id: int, ttl: int = 3600) -> str:
    expiry = int(time.time()) + ttl
    data = f"{telegram_id}_{expiry}"
    sig = hmac.new(BOT_TOKEN.encode(), data.encode(), hashlib.sha256).hexdigest()
    return f"{telegram_id}_{expiry}_{sig}"


def _panel_button(telegram_id: Optional[int]) -> KeyboardButton:
    # Telegram allows only HTTPS for Web App buttons; for local (http) use a normal button.
    if ADMIN_MINI_APP_URL.startswith("https://"):
        if BOT_TOKEN and telegram_id is not None:
            token = _generate_bot_auth_token(telegram_id)
            url = f"{ADMIN_MINI_APP_URL}?tg_auth={token}"
        else:
            url = ADMIN_MINI_APP_URL
        return KeyboardButton(text="🍽 Открыть панель", web_app=WebAppInfo(url=url))
    return KeyboardButton(text="🍽 Открыть панель")


def main_menu_keyboard(telegram_id: Optional[int] = None) -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📥 Активные заказы")],
            [_panel_button(telegram_id)],
            [KeyboardButton(text="📊 Итоги за сегодня")],
            [KeyboardButton(text="💬 Поддержка", url=SUPPORT_LINK)],
        ],
        resize_keyboard=True,
        input_field_placeholder="Выберите действие",
    )
