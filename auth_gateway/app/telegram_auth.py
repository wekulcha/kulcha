"""Telegram WebApp initData validation (same rules as kickoff / EtherDaler)."""

from __future__ import annotations

import hashlib
import hmac
import json
from typing import Any
from urllib.parse import unquote


def verify_telegram_init_data(init_data: str, bot_token: str) -> dict[str, Any] | None:
    if not init_data or not bot_token:
        return None
    try:
        parsed = dict(item.split("=", 1) for item in init_data.split("&") if "=" in item)
        received_hash = parsed.pop("hash", None)
        parsed.pop("signature", None)
        if not received_hash:
            return None

        data_check_string = "\n".join(f"{k}={unquote(v)}" for k, v in sorted(parsed.items()))
        secret_key = hmac.new(
            key=b"WebAppData",
            msg=bot_token.encode(),
            digestmod=hashlib.sha256,
        ).digest()
        expected_hash = hmac.new(
            key=secret_key,
            msg=data_check_string.encode(),
            digestmod=hashlib.sha256,
        ).hexdigest()

        if not hmac.compare_digest(expected_hash, received_hash):
            return None

        user_raw = parsed.get("user")
        if not user_raw:
            return None
        return json.loads(unquote(user_raw))
    except Exception:
        return None
