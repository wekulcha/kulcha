import asyncio
import logging
import os

from dotenv import load_dotenv
load_dotenv()

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.client.session.aiohttp import AiohttpSession
from aiogram.enums import ParseMode

from config import BOT_TOKEN
from handlers import router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
TELEGRAM_PROXY_URL = os.environ.get("TELEGRAM_PROXY_URL", "").strip()


async def main():
    if not BOT_TOKEN:
        logger.error("Set KULCHA_SUPERADMIN_BOT_TOKEN")
        return
    session = AiohttpSession(proxy=TELEGRAM_PROXY_URL) if TELEGRAM_PROXY_URL else None
    if TELEGRAM_PROXY_URL:
        logger.info("Telegram proxy is configured")
    bot = Bot(token=BOT_TOKEN, session=session, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
