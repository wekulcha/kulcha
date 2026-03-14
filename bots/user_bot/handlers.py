import httpx
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart

from config import API_BASE, SUPPORT_LINK, USER_MINI_APP_BASE
from keyboards import main_menu_keyboard, request_phone_keyboard

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message):
    user_id = message.from_user.id
    username = message.from_user.username or f"tg_{user_id}"
    async with httpx.AsyncClient() as client:
        try:
            for u in (username, f"tg_{user_id}"):
                r = await client.get(f"{API_BASE}/users", params={"username": u})
                if r.status_code == 200 and r.json():
                    await message.answer(
                        "Добро пожаловать в KULCHA! Выберите действие:",
                        reply_markup=main_menu_keyboard(),
                    )
                    return
        except Exception:
            pass
    await message.answer(
        "Добро пожаловать! Для использования бота нужно зарегистрироваться. Нажмите кнопку ниже:",
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
                json={
                    "username": username,
                    "phone": phone,
                    "email": None,
                    "address": None,
                },
            )
            if r.status_code in (200, 201):
                await message.answer(
                    "Регистрация прошла успешно! Теперь вы можете заказывать.",
                    reply_markup=main_menu_keyboard(),
                )
            else:
                await message.answer("Ошибка регистрации. Попробуйте позже.", reply_markup=main_menu_keyboard())
        except Exception as e:
            await message.answer(f"Ошибка: {e}. Попробуйте позже.", reply_markup=main_menu_keyboard())


@router.message(F.text == "🍽 Заказать")
async def order_cafes(message: Message):
    if not USER_MINI_APP_BASE.startswith("https://"):
        await message.answer(f"Откройте в браузере: {USER_MINI_APP_BASE}/cafes")


@router.message(F.text == "🧺 Корзина")
async def cart(message: Message):
    if not USER_MINI_APP_BASE.startswith("https://"):
        await message.answer(f"Откройте в браузере: {USER_MINI_APP_BASE}/cart")


@router.message(F.text == "👤 Профиль")
async def profile(message: Message):
    if not USER_MINI_APP_BASE.startswith("https://"):
        await message.answer(f"Откройте в браузере: {USER_MINI_APP_BASE}/profile")


@router.message(F.text == "📦 Статус заказа")
async def order_status(message: Message):
    await message.answer(
        "Функция «Статус заказа» пока в разработке. Откройте мини-приложение и перейдите в «Профиль» для просмотра заказов."
    )


@router.message(F.text == "💬 Поддержка")
async def support(message: Message):
    await message.answer(f"Связь с поддержкой: {SUPPORT_LINK}")
