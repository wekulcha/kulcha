from typing import List, Optional, Dict
from datetime import datetime, date, timedelta

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Float,
    Boolean,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import declarative_base, sessionmaker, Session, relationship

# ==========================
# DB SETUP (SQLite for dev)
# ==========================

DATABASE_URL = "sqlite:///./kulcha_dev.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# ==========================
# ORM MODELS
# ==========================

class RestaurantORM(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)

    meals = relationship("MealORM", back_populates="restaurant")
    orders = relationship("OrderORM", back_populates="restaurant")


class MealORM(Base):
    __tablename__ = "meal"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurant.id"), nullable=False)

    name = Column(String(255), nullable=False)
    description = Column(String, nullable=True)
    weight = Column(Integer, nullable=True)
    calorie = Column(Integer, nullable=True)
    image_link = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)  # e.g. "FIRST", "SECOND", etc.
    price = Column(Float, nullable=False)
    is_available = Column(Boolean, nullable=False, default=True)

    restaurant = relationship("RestaurantORM", back_populates="meals")
    positions = relationship("OrderPositionORM", back_populates="meal")


class OrderORM(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurant.id"), nullable=False)

    # "DELIVERY" | "DINE_IN"
    service_type = Column(String(50), nullable=False)
    delivery_address = Column(String(255), nullable=True)  # "Э-ЛЛ-ПП" или NULL
    username = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=False)
    payment_method = Column(String(50), nullable=False)  # "CASH" | "TRANSFER"

    # Статус заказа (для админки)
    # PENDING, COOKING, OUT_FOR_DELIVERY, COMPLETED, CANCELLED
    status = Column(String(50), nullable=False, default="PENDING")

    items_total = Column(Float, nullable=False)
    delivery_fee = Column(Float, nullable=False)
    service_fee = Column(Float, nullable=False)
    total = Column(Float, nullable=False)

    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    restaurant = relationship("RestaurantORM", back_populates="orders")
    positions = relationship("OrderPositionORM", back_populates="order")


class OrderPositionORM(Base):
    __tablename__ = "order_position"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    meal_id = Column(Integer, ForeignKey("meal.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)        # price per unit at time of order
    total_price = Column(Float, nullable=False)  # price * quantity

    order = relationship("OrderORM", back_populates="positions")
    meal = relationship("MealORM", back_populates="positions")


# ==========================
# INIT / SEEDING
# ==========================

def init_db():
    # ⚠️ Для DEV: каждый запуск пересоздаёт схему и данные.
    # В проде это нужно убрать.
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        cafe1 = RestaurantORM(
            name="Чайхана Самарканд",
            address="1-12-34 (Фуд Сити, этаж 1, линия 12, павильон 34)",
        )
        cafe2 = RestaurantORM(
            name="Coffee Point Kulcha",
            address="2-05-20 (Фуд Сити, этаж 2, линия 5, павильон 20)",
        )
        db.add_all([cafe1, cafe2])
        db.commit()

        restaurants = db.query(RestaurantORM).all()
        meals_to_add: List[MealORM] = []

        for r in restaurants:
            if "Самарканд" in r.name:
                meals_to_add.extend([
                    MealORM(
                        restaurant_id=r.id,
                        name="Плов по-узбекски",
                        description="Классический плов с бараниной, морковью и нутом.",
                        weight=350,
                        calorie=780,
                        image_link="https://via.placeholder.com/150?text=Plov",
                        category="SECOND",
                        price=450.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Шурпа",
                        description="Ароматный суп с говядиной и овощами.",
                        weight=300,
                        calorie=320,
                        image_link="https://via.placeholder.com/150?text=Shurpa",
                        category="FIRST",
                        price=320.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Лагман",
                        description="Домашняя лапша с мясом и овощами.",
                        weight=350,
                        calorie=640,
                        image_link="https://via.placeholder.com/150?text=Lagman",
                        category="SECOND",
                        price=390.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Манты с бараниной",
                        description="Сочные манты на пару с бараниной и луком.",
                        weight=250,
                        calorie=520,
                        image_link="https://via.placeholder.com/150?text=Manty",
                        category="SECOND",
                        price=380.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Самса с говядиной",
                        description="Слоёная самса с сочной начинкой",
                        weight=120,
                        calorie=310,
                        image_link="https://via.placeholder.com/150?text=Samsa",
                        category="SNACK",
                        price=150.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Салат 'Чайханский'",
                        description="Свежие овощи с зеленью.",
                        weight=200,
                        calorie=180,
                        image_link="https://via.placeholder.com/150?text=Salad",
                        category="SALAD",
                        price=260.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Зелёный чай в чайнике",
                        description="Традиционный зелёный чай, 600 мл.",
                        weight=600,
                        calorie=5,
                        image_link="https://via.placeholder.com/150?text=Tea",
                        category="DRINK",
                        price=200.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Чак-чак",
                        description="Традиционный десерт с мёдом.",
                        weight=150,
                        calorie=450,
                        image_link="https://via.placeholder.com/150?text=Chak-Chak",
                        category="DESSERT",
                        price=280.0,
                        is_available=True,
                    ),
                ])
            elif "Coffee Point" in r.name or "Coffee" in r.name:
                meals_to_add.extend([
                    MealORM(
                        restaurant_id=r.id,
                        name="Капучино",
                        description="Классический капучино, 300 мл.",
                        weight=300,
                        calorie=120,
                        image_link="https://via.placeholder.com/150?text=Cappuccino",
                        category="DRINK",
                        price=260.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Латте",
                        description="Мягкий латте, 350 мл.",
                        weight=350,
                        calorie=150,
                        image_link="https://via.placeholder.com/150?text=Latte",
                        category="DRINK",
                        price=280.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Американо",
                        description="Чёрный кофе, 250 мл.",
                        weight=250,
                        calorie=5,
                        image_link="https://via.placeholder.com/150?text=Americano",
                        category="DRINK",
                        price=200.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Круассан сливочный",
                        description="Слоёный круассан с маслом.",
                        weight=80,
                        calorie=280,
                        image_link="https://via.placeholder.com/150?text=Croissant",
                        category="SNACK",
                        price=160.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Чизкейк Нью-Йорк",
                        description="Классический чизкейк.",
                        weight=120,
                        calorie=420,
                        image_link="https://via.placeholder.com/150?text=Cheesecake",
                        category="DESSERT",
                        price=320.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Сэндвич с индейкой",
                        description="Тосты с индейкой, сыром и овощами.",
                        weight=200,
                        calorie=450,
                        image_link="https://via.placeholder.com/150?text=Sandwich",
                        category="SECOND",
                        price=350.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Брауни",
                        description="Шоколадный брауни с орехами.",
                        weight=90,
                        calorie=380,
                        image_link="https://via.placeholder.com/150?text=Brownie",
                        category="DESSERT",
                        price=240.0,
                        is_available=True,
                    ),
                    MealORM(
                        restaurant_id=r.id,
                        name="Матча латте",
                        description="Матча на молоке, 300 мл.",
                        weight=300,
                        calorie=130,
                        image_link="https://via.placeholder.com/150?text=Matcha",
                        category="DRINK",
                        price=320.0,
                        is_available=True,
                    ),
                ])

        if meals_to_add:
            db.add_all(meals_to_add)
            db.commit()
    finally:
        db.close()


# ==========================
# Pydantic schemas
# ==========================

class Restaurant(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        orm_mode = True


class Meal(BaseModel):
    id: int
    restaurant_id: int
    name: str
    description: Optional[str]
    weight: Optional[int]
    calorie: Optional[int]
    image_link: str
    category: str
    price: float
    is_available: bool

    class Config:
        orm_mode = True


class OrderItemIn(BaseModel):
    meal_id: int
    quantity: int
    price: float


class CreateOrderIn(BaseModel):
    restaurant_id: int
    service_type: str
    delivery_address: Optional[str]
    username: Optional[str]
    phone: str
    payment_method: str
    items: List[OrderItemIn]
    items_total: float
    delivery_fee: float
    service_fee: float
    total: float


class OrderOut(BaseModel):
    id: int
    total: float
    created_at: datetime

    class Config:
        orm_mode = True


class AdminRestaurantOut(BaseModel):
    id: int
    name: str
    address: str
    today_orders: int
    today_revenue: float


class AdminOrderItemOut(BaseModel):
    meal_id: int
    name: str
    quantity: int


class AdminOrderOut(BaseModel):
    id: int
    status: str
    created_at: datetime
    total: float
    service_type: str
    delivery_address: Optional[str]
    username: Optional[str]
    phone: str
    items: List[AdminOrderItemOut]


class UpdateOrderStatusIn(BaseModel):
    status: str


VALID_STATUSES = {
    "PENDING",
    "COOKING",
    "OUT_FOR_DELIVERY",
    "COMPLETED",
    "CANCELLED",
}


# Admin meal DTOs

class AdminMealCreate(BaseModel):
    name: str
    description: Optional[str] = None
    weight: Optional[int] = None
    calorie: Optional[int] = None
    image_link: str
    category: str
    price: float
    is_available: bool = True


class AdminMealUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    weight: Optional[int] = None
    calorie: Optional[int] = None
    image_link: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    is_available: Optional[bool] = None


class UpdateMealAvailabilityIn(BaseModel):
    is_available: bool


# Analytics DTOs (overview)

class PeriodSummary(BaseModel):
    label: str
    from_date: date
    to_date: date
    orders_count: int
    revenue: float
    average_check: float
    delivery_count: int
    dine_in_count: int


class MealStat(BaseModel):
    meal_id: int
    name: str
    quantity: int
    revenue: float


class RestaurantAnalytics(BaseModel):
    periods: Dict[str, PeriodSummary]
    top_meals: List[MealStat]


# Analytics DTOs (summary & daily)

class AnalyticsSummaryOut(BaseModel):
    period: str           # "today" | "7d" | "30d"
    from_date: date
    to_date: date
    orders_count: int
    revenue: float
    avg_check: float
    delivery_orders: int
    dine_in_orders: int


class AnalyticsDailyPointOut(BaseModel):
    date: date
    orders_count: int
    revenue: float


class AnalyticsDailySeriesOut(BaseModel):
    period: str
    from_date: date
    to_date: date
    points: List[AnalyticsDailyPointOut]


# ==========================
# Helpers
# ==========================

def _get_period_range(period: str) -> tuple[date, date]:
    """
    period: "today" | "7d" | "30d"
    Возвращает (from_date, to_date) включительно.
    """
    today = datetime.utcnow().date()
    if period == "today":
        return today, today
    elif period == "7d":
        start = today - timedelta(days=6)
        return start, today
    elif period == "30d":
        start = today - timedelta(days=29)
        return start, today
    else:
        raise ValueError("Invalid period")


# ==========================
# FastAPI app
# ==========================

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def on_startup():
    init_db()


# -------- User: Restaurants & meals --------

@app.get("/api/restaurants", response_model=List[Restaurant])
def list_restaurants(db: Session = Depends(get_db)):
    return db.query(RestaurantORM).order_by(RestaurantORM.id).all()


@app.get("/api/restaurants/{restaurant_id}/meals", response_model=List[Meal])
def list_meals_for_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    meals = (
        db.query(MealORM)
        .filter(MealORM.restaurant_id == restaurant_id, MealORM.is_available == True)  # noqa: E712
        .order_by(MealORM.id)
        .all()
    )
    return meals


# -------- User: Orders --------

@app.post("/api/orders", response_model=OrderOut)
def create_order(order_in: CreateOrderIn, db: Session = Depends(get_db)):
    if not order_in.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    restaurant = db.query(RestaurantORM).get(order_in.restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=400, detail="Restaurant not found")

    order = OrderORM(
        restaurant_id=order_in.restaurant_id,
        service_type=order_in.service_type,
        delivery_address=order_in.delivery_address,
        username=order_in.username,
        phone=order_in.phone,
        payment_method=order_in.payment_method,
        status="PENDING",
        items_total=order_in.items_total,
        delivery_fee=order_in.delivery_fee,
        service_fee=order_in.service_fee,
        total=order_in.total,
    )

    db.add(order)
    db.flush()

    for item in order_in.items:
        position = OrderPositionORM(
            order_id=order.id,
            meal_id=item.meal_id,
            quantity=item.quantity,
            price=item.price,
            total_price=item.price * item.quantity,
        )
        db.add(position)

    db.commit()
    db.refresh(order)

    return order


# -------- ADMIN: restaurants summary --------

@app.get("/api/admin/restaurants", response_model=List[AdminRestaurantOut])
def list_admin_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(RestaurantORM).order_by(RestaurantORM.id).all()
    today: date = datetime.utcnow().date()

    result: List[AdminRestaurantOut] = []

    for r in restaurants:
        today_orders = 0
        today_revenue = 0.0
        for o in r.orders:
            if o.created_at and o.created_at.date() == today:
                today_orders += 1
                today_revenue += o.total
        result.append(
            AdminRestaurantOut(
                id=r.id,
                name=r.name,
                address=r.address,
                today_orders=today_orders,
                today_revenue=today_revenue,
            )
        )

    return result


# -------- ADMIN: orders list for restaurant --------

@app.get(
    "/api/admin/restaurants/{restaurant_id}/orders",
    response_model=List[AdminOrderOut],
)
def list_admin_orders_for_restaurant(
    restaurant_id: int,
    status: Optional[str] = Query(default=None, description="PENDING/COOKING/OUT_FOR_DELIVERY/COMPLETED/CANCELLED or ALL"),
    db: Session = Depends(get_db),
):
    q = db.query(OrderORM).filter(OrderORM.restaurant_id == restaurant_id)

    if status and status != "ALL":
        if status not in VALID_STATUSES:
            raise HTTPException(status_code=400, detail="Invalid status filter")
        q = q.filter(OrderORM.status == status)

    orders = q.order_by(OrderORM.created_at.desc()).all()
    result: List[AdminOrderOut] = []

    for o in orders:
        items_out: List[AdminOrderItemOut] = []
        for pos in o.positions:
            meal_name = pos.meal.name if pos.meal else f"#{pos.meal_id}"
            items_out.append(
                AdminOrderItemOut(
                    meal_id=pos.meal_id,
                    name=meal_name,
                    quantity=pos.quantity,
                )
            )

        result.append(
            AdminOrderOut(
                id=o.id,
                status=o.status,
                created_at=o.created_at,
                total=o.total,
                service_type=o.service_type,
                delivery_address=o.delivery_address,
                username=o.username,
                phone=o.phone,
                items=items_out,
            )
        )

    return result


# -------- ADMIN: update order status --------

@app.patch("/api/admin/orders/{order_id}/status", response_model=AdminOrderOut)
def update_order_status(
    order_id: int,
    body: UpdateOrderStatusIn,
    db: Session = Depends(get_db),
):
    new_status = body.status
    if new_status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")

    order = db.query(OrderORM).get(order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = new_status
    db.commit()
    db.refresh(order)

    items_out: List[AdminOrderItemOut] = []
    for pos in order.positions:
        meal_name = pos.meal.name if pos.meal else f"#{pos.meal_id}"
        items_out.append(
            AdminOrderItemOut(
                meal_id=pos.meal_id,
                name=meal_name,
                quantity=pos.quantity,
            )
        )

    return AdminOrderOut(
        id=order.id,
        status=order.status,
        created_at=order.created_at,
        total=order.total,
        service_type=order.service_type,
        delivery_address=order.delivery_address,
        username=order.username,
        phone=order.phone,
        items=items_out,
    )


# -------- ADMIN: menu management --------

@app.get(
    "/api/admin/restaurants/{restaurant_id}/meals",
    response_model=List[Meal],
)
def admin_list_meals_for_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    meals = (
        db.query(MealORM)
        .filter(MealORM.restaurant_id == restaurant_id)
        .order_by(MealORM.id)
        .all()
    )
    return meals


@app.post(
    "/api/admin/restaurants/{restaurant_id}/meals",
    response_model=Meal,
)
def admin_create_meal(
    restaurant_id: int,
    data: AdminMealCreate,
    db: Session = Depends(get_db),
):
    restaurant = db.query(RestaurantORM).get(restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    meal = MealORM(
        restaurant_id=restaurant_id,
        name=data.name,
        description=data.description,
        weight=data.weight,
        calorie=data.calorie,
        image_link=data.image_link,
        category=data.category,
        price=data.price,
        is_available=data.is_available,
    )
    db.add(meal)
    db.commit()
    db.refresh(meal)
    return meal


@app.put(
    "/api/admin/meals/{meal_id}",
    response_model=Meal,
)
def admin_update_meal(
    meal_id: int,
    data: AdminMealUpdate,
    db: Session = Depends(get_db),
):
    meal = db.query(MealORM).get(meal_id)
    if meal is None:
        raise HTTPException(status_code=404, detail="Meal not found")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(meal, field, value)

    db.commit()
    db.refresh(meal)
    return meal


@app.patch(
    "/api/admin/meals/{meal_id}/availability",
    response_model=Meal,
)
def admin_update_meal_availability(
    meal_id: int,
    body: UpdateMealAvailabilityIn,
    db: Session = Depends(get_db),
):
    meal = db.query(MealORM).get(meal_id)
    if meal is None:
        raise HTTPException(status_code=404, detail="Meal not found")

    meal.is_available = body.is_available
    db.commit()
    db.refresh(meal)
    return meal


@app.delete("/api/admin/meals/{meal_id}")
def admin_delete_meal(
    meal_id: int,
    db: Session = Depends(get_db),
):
    meal = db.query(MealORM).get(meal_id)
    if meal is None:
        raise HTTPException(status_code=404, detail="Meal not found")

    db.delete(meal)
    db.commit()
    return {"ok": True}


# -------- ADMIN: analytics overview --------

@app.get(
    "/api/admin/restaurants/{restaurant_id}/analytics/overview",
    response_model=RestaurantAnalytics,
)
def admin_restaurant_analytics_overview(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    restaurant = db.query(RestaurantORM).get(restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    orders: List[OrderORM] = (
        db.query(OrderORM)
        .filter(OrderORM.restaurant_id == restaurant_id)
        .all()
    )

    today = datetime.utcnow().date()

    def summarize_period(label: str, from_date: date, to_date: date) -> PeriodSummary:
        period_orders = [
            o
            for o in orders
            if o.created_at and from_date <= o.created_at.date() <= to_date
        ]
        orders_count = len(period_orders)
        revenue = sum(o.total for o in period_orders)
        average_check = revenue / orders_count if orders_count > 0 else 0.0
        delivery_count = sum(1 for o in period_orders if o.service_type == "DELIVERY")
        dine_in_count = sum(1 for o in period_orders if o.service_type == "DINE_IN")
        return PeriodSummary(
            label=label,
            from_date=from_date,
            to_date=to_date,
            orders_count=orders_count,
            revenue=revenue,
            average_check=average_check,
            delivery_count=delivery_count,
            dine_in_count=dine_in_count,
        )

    # today
    today_from = today
    today_to = today

    # last 7 days (including today)
    week_to = today
    week_from = today - timedelta(days=6)

    # last 30 days (including today)
    month_to = today
    month_from = today - timedelta(days=29)

    periods: Dict[str, PeriodSummary] = {
        "today": summarize_period("Сегодня", today_from, today_to),
        "7d": summarize_period("7 дней", week_from, week_to),
        "30d": summarize_period("30 дней", month_from, month_to),
    }

    # top meals (all time)
    meal_stats: Dict[int, MealStat] = {}
    for o in orders:
        for pos in o.positions:
            if pos.meal_id is None:
                continue
            mid = pos.meal_id
            if mid not in meal_stats:
                name = pos.meal.name if pos.meal else f"#{mid}"
                meal_stats[mid] = MealStat(
                    meal_id=mid,
                    name=name,
                    quantity=0,
                    revenue=0.0,
                )
            st = meal_stats[mid]
            st.quantity += pos.quantity
            st.revenue += pos.total_price

    top_meals = sorted(
        meal_stats.values(),
        key=lambda m: m.revenue,
        reverse=True,
    )[:5]

    return RestaurantAnalytics(
        periods=periods,
        top_meals=top_meals,
    )


# -------- ADMIN: analytics summary & daily --------

@app.get(
    "/api/admin/restaurants/{restaurant_id}/analytics/summary",
    response_model=AnalyticsSummaryOut,
)
def admin_analytics_summary(
    restaurant_id: int,
    period: str = "today",  # "today" | "7d" | "30d"
    db: Session = Depends(get_db),
):
    try:
        from_date, to_date = _get_period_range(period)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid period")

    q = (
        db.query(OrderORM)
        .filter(OrderORM.restaurant_id == restaurant_id)
        .filter(
            OrderORM.created_at >= datetime.combine(
                from_date, datetime.min.time()
            )
        )
        .filter(
            OrderORM.created_at <= datetime.combine(
                to_date, datetime.max.time()
            )
        )
    )

    orders: List[OrderORM] = q.all()

    orders_count = len(orders)
    revenue = float(sum(o.total for o in orders))
    avg_check = float(revenue / orders_count) if orders_count > 0 else 0.0

    delivery_orders = sum(1 for o in orders if o.service_type == "DELIVERY")
    dine_in_orders = sum(1 for o in orders if o.service_type == "DINE_IN")

    return AnalyticsSummaryOut(
        period=period,
        from_date=from_date,
        to_date=to_date,
        orders_count=orders_count,
        revenue=revenue,
        avg_check=avg_check,
        delivery_orders=delivery_orders,
        dine_in_orders=dine_in_orders,
    )


@app.get(
    "/api/admin/restaurants/{restaurant_id}/analytics/daily",
    response_model=AnalyticsDailySeriesOut,
)
def admin_analytics_daily(
    restaurant_id: int,
    period: str = "7d",  # "today" | "7d" | "30d"
    db: Session = Depends(get_db),
):
    try:
        from_date, to_date = _get_period_range(period)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid period")

    days_count = (to_date - from_date).days + 1
    stats: Dict[date, Dict[str, float]] = {}
    for i in range(days_count):
        d = from_date + timedelta(days=i)
        stats[d] = {"orders": 0.0, "revenue": 0.0}

    q = (
        db.query(OrderORM)
        .filter(OrderORM.restaurant_id == restaurant_id)
        .filter(
            OrderORM.created_at >= datetime.combine(
                from_date, datetime.min.time()
            )
        )
        .filter(
            OrderORM.created_at <= datetime.combine(
                to_date, datetime.max.time()
            )
        )
    )

    for o in q.all():
        d = o.created_at.date()
        if d in stats:
            stats[d]["orders"] += 1
            stats[d]["revenue"] += float(o.total)

    points: List[AnalyticsDailyPointOut] = []
    for i in range(days_count):
        d = from_date + timedelta(days=i)
        data = stats[d]
        points.append(
            AnalyticsDailyPointOut(
                date=d,
                orders_count=int(data["orders"]),
                revenue=float(data["revenue"]),
            )
        )

    return AnalyticsDailySeriesOut(
        period=period,
        from_date=from_date,
        to_date=to_date,
        points=points,
    )
