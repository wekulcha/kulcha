import httpx
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart

from config import ADMIN_MINI_APP_URL, API_BASE, INTERNAL_API_SECRET, SUPPORT_LINK
from keyboards import main_menu_keyboard

router = Router()

STATUS_FROM_CB = {
    "ACC": "ACCEPTED",
    "COO": "COOKING",
    "DEL": "DELIVERY",
    "DON": "DONE",
    "CAN": "CANCELLED",
}


@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.answer(
        "<b>Панель ресторана KULCHA</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Здесь приходят <b>новые заказы</b> и кнопки смены статуса. "
        "Управление меню и аналитика — в мини-приложении.",
        reply_markup=main_menu_keyboard(),
    )


@router.message(F.text == "🍽 Открыть панель")
async def open_panel(message: Message):
    if not ADMIN_MINI_APP_URL.startswith("https://"):
        await message.answer(
            f"<b>Локальная панель</b>\nОткройте в браузере:\n<code>{ADMIN_MINI_APP_URL}</code>"
        )


@router.message(F.text == "📥 Активные заказы")
async def active_orders(message: Message):
    await message.answer(
        "<b>Активные заказы</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Список заказов — в мини-приложении (кнопка «Открыть панель»). "
        "О новых заказах мы пришлём сообщение сюда."
    )


@router.message(F.text == "📊 Итоги за сегодня")
async def today_summary(message: Message):
    await message.answer(
        "<b>Итоги</b>\n"
        "━━━━━━━━━━━━━━\n"
        "Графики и выручка — во вкладке «Аналитика» в мини-приложении."
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
                    await query.message.edit_reply_markup(reply_markup=None)
                except Exception:
                    pass
        else:
            await query.answer(f"Ошибка API: {r.status_code}", show_alert=True)
    except Exception as e:
        await query.answer(f"Ошибка: {e}", show_alert=True)
