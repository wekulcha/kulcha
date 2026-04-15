from __future__ import annotations

import logging

import httpx

logger = logging.getLogger(__name__)


async def send_message(
    bot_token: str,
    chat_id: int,
    text: str,
    parse_mode: str | None = "HTML",
    reply_markup: dict | None = None,
) -> None:
    if not bot_token:
        logger.warning("Telegram send skipped: empty bot token")
        return

    body: dict = {"chat_id": chat_id, "text": text}
    if parse_mode:
        body["parse_mode"] = parse_mode
    if reply_markup:
        body["reply_markup"] = reply_markup

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, json=body)
            if resp.status_code < 200 or resp.status_code >= 300:
                logger.warning("Telegram sendMessage failed: %s body=%s", resp.status_code, resp.text)
    except Exception as e:
        logger.warning("Telegram sendMessage error: %s", e)
