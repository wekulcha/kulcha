from __future__ import annotations

from sqlalchemy import BigInteger, Enum as SQLEnum, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.enums import StaffPermission


class Staff(Base):
    __tablename__ = "staff"
    __table_args__ = (
        UniqueConstraint("user_id", "restaurant_id", "permission"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id"), nullable=False)
    restaurant_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("restaurant.id"), nullable=False)
    # VARCHAR, не нативный ENUM PostgreSQL — на проде часто нет типа staffpermission
    permission: Mapped[StaffPermission] = mapped_column(
        SQLEnum(StaffPermission, native_enum=False, length=64),
        nullable=False,
    )

    user = relationship("User", lazy="joined")
    restaurant = relationship("Restaurant", lazy="joined")
