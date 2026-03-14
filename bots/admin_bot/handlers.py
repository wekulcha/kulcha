from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import CommandStart

from config import ADMIN_MINI_APP_URL
from keyboards import main_menu_keyboard

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.answer(
        "Панель администратора KULCHA. Выберите действие:",
        reply_markup=main_menu_keyboard(),
    )


@router.message(F.text == "🍽 Открыть панель")
async def open_panel(message: Message):
    # When URL is HTTP (e.g. localhost), the button is normal; send the link to open in browser.
    if not ADMIN_MINI_APP_URL.startswith("https://"):
        await message.answer(
            f"Панель (локальная): откройте в браузере:\n{ADMIN_MINI_APP_URL}"
        )


@router.message(F.text == "📥 Активные заказы")
async def active_orders(message: Message):
    await message.answer(
        "Откройте панель администратора по кнопке «🍽 Открыть панель» для просмотра активных заказов."
    )


@router.message(F.text == "📊 Итоги за сегодня")
async def today_summary(message: Message):
    await message.answer("Итоги за сегодня отображаются в панели администратора (вкладка «Аналитика»).")
