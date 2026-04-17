from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class OrderDto(BaseModel):
    id: int | None = None
    status: str | None = None
    userId: int | None = None
    deliveryAddress: str | None = None
    tableNumber: str | None = None
    restaurantId: int | None = None
    createdAt: datetime | None = None
    updatedAt: datetime | None = None
    courierId: int | None = None
    orderType: str | None = None
    itemsTotal: Decimal | None = None
    deliveryFee: Decimal | None = None
    serviceFee: Decimal | None = None
    total: Decimal | None = None


class OrderCheckoutLine(BaseModel):
    mealId: int
    quantity: int
    unitPrice: Decimal | None = None


class OrderCheckoutRequest(BaseModel):
    restaurantId: int
    deliveryAddress: str | None = None
    tableNumber: str | None = None
    orderType: str
    itemsTotal: Decimal | None = None
    deliveryFee: Decimal | None = None
    serviceFee: Decimal | None = None
    total: Decimal | None = None
    items: list[OrderCheckoutLine]


class OrderStatusPatchDto(BaseModel):
    status: str
