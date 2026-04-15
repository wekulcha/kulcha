from __future__ import annotations

from pydantic import BaseModel


class RestaurantDto(BaseModel):
    id: int | None = None
    name: str | None = None
    address: str | None = None
