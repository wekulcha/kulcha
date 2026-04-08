import httpx
from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import CommandStart

from config import API_BASE, BOT_API_SECRET, SUPPORT_LINK, USER_MINI_APP_BASE
from keyboards import main_menu_keyboard, request_phone_keyboard

router = Router()


def _bot_headers() -> dict:
    h = {}
    if BOT_API_SECRET:
        h["X-Kulcha-Bot-Secret"] = BOT_API_SECRET
    return h


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
                    reply_markup=main_menu_keyboard(),
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
                    reply_markup=main_menu_keyboard(),
                )
            else:
                await message.answer(
                    "Не удалось сохранить профиль. Попробуйте позже или напишите в поддержку.",
                    reply_markup=main_menu_keyboard(),
                )
        except Exception as e:
            await message.answer(
                f"Ошибка сети: <code>{e}</code>",
                reply_markup=main_menu_keyboard(),
            )


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
