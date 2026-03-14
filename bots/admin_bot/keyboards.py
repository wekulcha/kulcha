from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

from config import ADMIN_MINI_APP_URL, SUPPORT_LINK


def _panel_button() -> KeyboardButton:
    # Telegram allows only HTTPS for Web App buttons; for local (http) use a normal button.
    if ADMIN_MINI_APP_URL.startswith("https://"):
        return KeyboardButton(text="🍽 Открыть панель", web_app=WebAppInfo(url=ADMIN_MINI_APP_URL))
    return KeyboardButton(text="🍽 Открыть панель")


def main_menu_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📥 Активные заказы")],
            [_panel_button()],
            [KeyboardButton(text="📊 Итоги за сегодня")],
            [KeyboardButton(text="💬 Поддержка", url=SUPPORT_LINK)],
        ],
        resize_keyboard=True,
        input_field_placeholder="Выберите действие",
    )
