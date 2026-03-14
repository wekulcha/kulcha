from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

from config import USER_MINI_APP_BASE, SUPPORT_LINK

# Telegram принимает только HTTPS для Web App. Для localhost (http) используем обычные кнопки.
_USE_WEB_APP = USER_MINI_APP_BASE.startswith("https://")


def main_menu_keyboard() -> ReplyKeyboardMarkup:
    if _USE_WEB_APP:
        return ReplyKeyboardMarkup(
            keyboard=[
                [KeyboardButton(text="🍽 Заказать", web_app=WebAppInfo(url=f"{USER_MINI_APP_BASE}/cafes"))],
                [
                    KeyboardButton(text="🧺 Корзина", web_app=WebAppInfo(url=f"{USER_MINI_APP_BASE}/cart")),
                    KeyboardButton(text="👤 Профиль", web_app=WebAppInfo(url=f"{USER_MINI_APP_BASE}/profile")),
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
