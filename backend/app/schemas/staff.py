from __future__ import annotations

from pydantic import BaseModel


class StaffDto(BaseModel):
    id: int | None = None
    userId: int | None = None
    restaurantId: int | None = None
    permission: str | None = None


class StaffMemberDto(BaseModel):
    staffId: int
    userId: int
    username: str | None = None
    phone: str | None = None
    permission: str


class AddStaffRequestDto(BaseModel):
    telegramId: int
    permission: str
