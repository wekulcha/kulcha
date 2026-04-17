import enum


class MealCategory(str, enum.Enum):
    # Основные блюда
    FIRST = "FIRST"
    SECOND = "SECOND"
    SOUP = "SOUP"
    SALAD = "SALAD"
    SIDE = "SIDE"
    # Выпечка, шашлыки, комбо и т.д.
    BAKERY = "BAKERY"
    KEBAB = "KEBAB"
    GRILL = "GRILL"
    COMBO = "COMBO"
    SNACK = "SNACK"
    BREAKFAST = "BREAKFAST"
    DESSERT = "DESSERT"
    DRINK = "DRINK"
    SAUCE = "SAUCE"
    PLATTER = "PLATTER"


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
