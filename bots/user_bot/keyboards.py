from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

from config import SUPPORT_LINK


def main_menu_keyboard() -> ReplyKeyboardMarkup:
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
