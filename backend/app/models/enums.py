import enum


class MealCategory(str, enum.Enum):
    FIRST = "FIRST"
    SECOND = "SECOND"
    SALAD = "SALAD"
    DESSERT = "DESSERT"
    DRINK = "DRINK"


class OrderStatus(str, enum.Enum):
    CREATED = "CREATED"
    ACCEPTED = "ACCEPTED"
    COOKING = "COOKING"
    DELIVERY = "DELIVERY"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


class OrderType(str, enum.Enum):
    DELIVERY = "DELIVERY"
    DINE_IN = "DINE_IN"


class StaffPermission(str, enum.Enum):
    CAN_EDIT_MENU = "CAN_EDIT_MENU"
    CAN_LOOK_ORDERS = "CAN_LOOK_ORDERS"
