from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import AliasChoices, BaseModel, Field

from app.schemas.meal import MealDto
from app.schemas.order import OrderDto
from app.schemas.staff import StaffDto
from app.schemas.user import UserDto, UserRestaurantDto


class AdminWebAppSessionDto(BaseModel):
    user: UserDto
    restaurants: list[UserRestaurantDto]


class AdminStaffAssignmentDto(BaseModel):
    staffId: int
    restaurantId: int
    restaurantName: str
    permission: str


class AdminOrderHistoryItemDto(BaseModel):
    orderId: int
    status: str
    restaurantId: int
    restaurantName: str
    total: Decimal | None = None
    createdAt: datetime | None = None


class AdminUserOverviewDto(BaseModel):
    id: int
    username: str | None = None
    phone: str | None = None
    email: str | None = None
    address: str | None = None
    courier: bool = False
    staffAssignments: list[AdminStaffAssignmentDto] = []
    orderHistory: list[AdminOrderHistoryItemDto] = []


class AdminRestaurantOverviewDto(BaseModel):
    id: int
    name: str
    address: str
    staff: list[StaffDto] = []
    meals: list[MealDto] = []
    orderHistory: list[OrderDto] = []


class AdminRestaurantDto(BaseModel):
    id: int
    name: str
    address: str
    ownerUserId: int
    ownerPermissions: list[str] = []


class AdminCreateRestaurantRequestDto(BaseModel):
    """Создание ресторана и привязка владельца по Telegram user id (users.id)."""

    name: str
    address: str
    ownerUserId: int = Field(
        ...,
        validation_alias=AliasChoices("ownerUserId", "adminUserId"),
    )


class AdminAssignCourierRequestDto(BaseModel):
    userId: int


class AdminAssignStaffRequestDto(BaseModel):
    userId: int
    permission: str


class AdminCourierDto(BaseModel):
    courierId: int
    userId: int
    username: str | None = None
    phone: str | None = None
    email: str | None = None
