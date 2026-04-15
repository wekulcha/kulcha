from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import BigInteger, DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.enums import OrderStatus, OrderType


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    status: Mapped[OrderStatus] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id"), nullable=False)
    delivery_address: Mapped[str | None] = mapped_column(String, nullable=True)
    restaurant_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("restaurant.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    courier_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("courier.id"), nullable=True)
    order_type: Mapped[OrderType] = mapped_column(nullable=False)
    items_total: Mapped[Decimal] = mapped_column(Numeric, nullable=False)
    delivery_fee: Mapped[Decimal] = mapped_column(Numeric, nullable=False)
    service_fee: Mapped[Decimal] = mapped_column(Numeric, nullable=False)
    total: Mapped[Decimal] = mapped_column(Numeric, nullable=False)

    user = relationship("User", lazy="joined")
    restaurant = relationship("Restaurant", lazy="joined")
    courier = relationship("Courier", lazy="joined")
