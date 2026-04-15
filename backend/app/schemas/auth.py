from __future__ import annotations

from pydantic import BaseModel


class BotTokenRequest(BaseModel):
    token: str
