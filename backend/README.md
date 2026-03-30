# KULCHA Frontend Generation Spec (for Cursor)

## 1. Purpose
This document is a **single source of truth** for Cursor to generate a frontend for the current backend.

Primary objective:
- Build a working web frontend for:
  - superadmin/developer panel
  - restaurant admin flows
  - courier panel flows
  - basic user ordering flows

Backend status:
- API version: `v1`
- Base URL (local): `http://localhost:8080/api/v1`
- All endpoints below are implemented and smoke-tested.

---

## 2. Business Roles and Flows

### Superadmin (developers)
Can:
- view all users with:
  - order history
  - courier role flag
  - restaurant staff assignments
- view all restaurants with:
  - staff
  - full menu
  - order history
- create restaurant with admin user
- assign staff permissions to restaurant users
- assign/remove couriers (users become couriers)

### Restaurant admin
Can:
- see `My Restaurants`
- for each own restaurant:
  - manage menu
  - view orders
  - add workers with permissions

### Courier
Can:
- be created from a regular user by superadmin
- open dedicated courier panel
- see orders that must be delivered now
- see delivery history (completed deliveries)
- see own created orders history (as a regular customer)

### Regular user
Can:
- be created via simple form
- browse restaurants
- browse menu of a restaurant
- place and track orders (basic CRUD currently)
- if user becomes restaurant staff, `My Restaurants` tab should appear

Important current limitation:
- No backend auth/JWT yet. In frontend, implement temporary “session by selected userId”.
- Role-based visibility is frontend-driven for now (derive role from API responses).

---

## 3. Recommended Frontend Stack

Use this stack unless user overrides:
- React + TypeScript + Vite
- React Router
- TanStack Query
- Axios
- Zod (runtime validation for forms)
- UI: any component library (e.g. shadcn/ui, MUI, AntD)

Environment:
- `VITE_API_BASE_URL=http://localhost:8080/api/v1`

---

## 4. API Reference (Current Backend)

## 4.1 Users
- `GET /users?phone=&username=` -> `UserDto[]`
- `GET /users/{id}` -> `UserDto`
- `GET /users/{id}/my-restaurants` -> `UserRestaurantDto[]`
- `POST /users` -> `UserDto`
- `PUT /users/{id}` -> `UserDto`
- `DELETE /users/{id}` -> `204`

`UserDto`:
```ts
type UserDto = {
  id: number
  username: string
  phone: string
  email: string | null
  address: string | null
  registeredAt: string // LocalDateTime ISO
}
```

`UserRestaurantDto`:
```ts
type UserRestaurantDto = {
  id: number
  name: string
  address: string
  permissions: StaffPermission[]
}
```

## 4.2 Restaurants
- `GET /restaurants` -> `RestaurantDto[]`
- `GET /restaurants/{id}` -> `RestaurantDto`
- `GET /restaurants/{id}/meals?category=&availableOnly=true|false` -> `MealDto[]`

## 4.3 Meals
- `GET /meals?restaurantId=&category=` -> `MealDto[]`
- `GET /meals/{id}` -> `MealDto`
- `POST /meals` -> `MealDto`
- `PUT /meals/{id}` -> `MealDto`
- `DELETE /meals/{id}` -> `204`

## 4.4 Orders
- `GET /orders?userId=&restaurantId=&status=` -> `OrderDto[]`
- `GET /orders/{id}` -> `OrderDto`
- `POST /orders` -> `OrderDto`
- `PUT /orders/{id}` -> `OrderDto`
- `DELETE /orders/{id}` -> `204`

## 4.5 Order Positions
- `GET /order-positions?orderId=&mealId=` -> `OrderPositionDto[]`
- `GET /order-positions/{id}` -> `OrderPositionDto`
- `POST /order-positions` -> `OrderPositionDto`
- `PUT /order-positions/{id}` -> `OrderPositionDto`
- `DELETE /order-positions/{id}` -> `204`

## 4.6 Couriers
- `GET /couriers?userId=` -> `CourierDto[]`
- `GET /couriers/{id}` -> `CourierDto`
- `POST /couriers` -> `CourierDto`
- `PUT /couriers/{id}` -> `CourierDto`
- `DELETE /couriers/{id}` -> `204`

## 4.7 Courier Panel
- `GET /courier-panel/{userId}` -> `CourierPanelOverviewDto`
- `GET /courier-panel/{userId}/delivery-orders` -> `OrderDto[]`
- `GET /courier-panel/{userId}/delivery-history` -> `OrderDto[]`
- `GET /courier-panel/{userId}/created-orders` -> `OrderDto[]`

`CourierPanelOverviewDto`:
```ts
type CourierPanelOverviewDto = {
  courierId: number
  userId: number
  deliveryOrders: OrderDto[]
  deliveryHistory: OrderDto[]
  createdOrders: OrderDto[]
}
```

## 4.8 Staff
- `GET /staff?userId=&restaurantId=&permission=` -> `StaffDto[]`
- `GET /staff/{id}` -> `StaffDto`
- `POST /staff` -> `StaffDto`
- `PUT /staff/{id}` -> `StaffDto`
- `DELETE /staff/{id}` -> `204`

## 4.9 Subscription Logs
- `GET /subscription-logs?restaurantId=&activeOnly=` -> `SubscriptionLogDto[]`
- `GET /subscription-logs/{id}` -> `SubscriptionLogDto`
- `POST /subscription-logs` -> `SubscriptionLogDto`
- `PUT /subscription-logs/{id}` -> `SubscriptionLogDto`
- `DELETE /subscription-logs/{id}` -> `204`

## 4.10 Admin (Superadmin)
- `GET /admin/users` -> `AdminUserOverviewDto[]`
- `GET /admin/couriers` -> `AdminCourierDto[]`
- `GET /admin/restaurants` -> `AdminRestaurantOverviewDto[]`
- `GET /admin/users/{userId}/restaurants` -> `AdminRestaurantDto[]`
- `POST /admin/restaurants` -> `AdminRestaurantDto`
- `POST /admin/couriers` -> `AdminCourierDto`
- `POST /admin/restaurants/{restaurantId}/staff` -> `StaffDto`
- `DELETE /admin/couriers/{courierId}` -> `204`

`POST /admin/restaurants` request:
```json
{
  "name": "Restaurant Name",
  "address": "Street 1",
  "adminUserId": 2
}
```

Notes:
- Restaurant admin gets **all existing staff permissions** automatically.
- Assign staff endpoint returns `409` if the same `(user, restaurant, permission)` already exists.
- Assign courier endpoint returns `409` if user is already a courier.

---

## 5. Enums

```ts
type MealCategory = "FIRST" | "SECOND" | "SALAD" | "DESSERT" | "DRINK"
type OrderStatus = "CREATED" | "ACCEPTED" | "COOKING" | "DELIVERY" | "DONE" | "CANCELLED"
type OrderType = "DELIVERY" | "DINE_IN"
type StaffPermission = "CAN_EDIT_MENU" | "CAN_LOOK_ORDERS"
```

---

## 6. UI Routes to Generate

Minimum routes:
- `/` -> redirect to `/restaurants`
- `/users/new` -> create user form
- `/restaurants` -> restaurants catalog
- `/restaurants/:id` -> restaurant details + menu
- `/orders` -> current user order list
- `/my-restaurants` -> show restaurants from `GET /users/{id}/my-restaurants`
- `/courier` -> courier dashboard (overview)
- `/courier/delivery-orders` -> active delivery orders
- `/courier/delivery-history` -> completed deliveries
- `/courier/created-orders` -> own created orders

Superadmin routes:
- `/admin/users` -> users overview table + details drawer
- `/admin/couriers` -> courier list + add/remove courier actions
- `/admin/restaurants` -> restaurants overview table + details
- `/admin/restaurants/new` -> form with 3 fields (`name`, `address`, `adminUserId`)
- `/admin/restaurants/:id/staff` -> assign staff permission form

Restaurant admin routes:
- `/cabinet/restaurants/:id/menu` -> manage meals
- `/cabinet/restaurants/:id/orders` -> restaurant order history
- `/cabinet/restaurants/:id/staff` -> staff management

---

## 7. Frontend Architecture Requirements

Must-have:
- `src/api`:
  - `client.ts` (axios instance)
  - resource files (`users.api.ts`, `admin.api.ts`, ...)
- `src/types`:
  - TS types mirroring DTOs above
- `src/features`:
  - `users`, `restaurants`, `orders`, `admin`, `courier`
- `src/pages`:
  - page components mapped to routes
- `src/components/common`:
  - table, form wrappers, loaders, error blocks

State rules:
- Use TanStack Query for server state.
- Keep selected `currentUserId` in localStorage (temporary auth simulation).
- Derive visible tabs:
  - show `My Restaurants` only if `/users/{id}/my-restaurants` returns non-empty.
  - show `Courier Panel` only if user exists in `/admin/couriers` or `/couriers?userId=...`.

UX requirements:
- Loading, empty, and error states on every page.
- Use optimistic updates only where safe; otherwise refetch after mutation.
- Show backend validation/`409` errors in user-friendly toasts/messages.

---

## 8. Implementation Plan for Cursor (Strict Order)

1. Bootstrap app with routing, API client, query client.
2. Add DTO types and enum types.
3. Implement Users module (`create/list/view`).
4. Implement Restaurants catalog + restaurant menu page.
5. Implement Orders + OrderPositions basic CRUD screens.
6. Implement My Restaurants page.
7. Implement Admin Users overview page.
8. Implement Admin Couriers page (assign/remove courier from existing users).
9. Implement Admin Restaurants overview page.
10. Implement Create Restaurant (3 fields) + Assign Staff form.
11. Implement restaurant-admin cabinet pages (menu/orders/staff).
12. Implement dedicated Courier Panel pages (overview, active deliveries, delivery history, own orders).
13. Add global error boundary, toast system, and polish.

---

## 9. Acceptance Criteria

Frontend is accepted when:
- It runs locally and talks to `http://localhost:8080/api/v1`.
- All listed routes render and work without hardcoded mock data.
- Superadmin can:
  - view full users overview
  - assign/remove couriers from existing users
  - view full restaurants overview
  - create restaurant with admin
  - assign staff permissions
- User can:
  - create account via form
  - view restaurants and menu
  - place/update/delete order and positions
  - see `My Restaurants` when staff assignments exist
- Courier can:
  - open dedicated courier panel
  - see active delivery orders
  - see delivery history
  - see own created orders
- Error states and empty states are visible and understandable.

---

## 10. Backend Run Instructions (for Frontend Dev)

### Option A: H2 (default, fastest for demo)
From this folder:
```bash
./mvnw spring-boot:run
```

Or explicitly:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=h2
```

### Option B: PostgreSQL (via Docker)
Start PostgreSQL:
```bash
docker compose up -d postgres
```

Stop PostgreSQL:
```bash
docker compose down
```

Run backend with postgres profile:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

If you want custom credentials/URL:
```bash
POSTGRES_URL=jdbc:postgresql://localhost:5432/kulcha \
POSTGRES_USER=kulcha \
POSTGRES_PASSWORD=kulcha \
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

Health check:
- Open `http://localhost:8080/api/v1/restaurants` (should return JSON array)

Local DB:
- H2 profile: in-memory DB (data resets on restart), console at `/h2-console`
- Postgres profile: persistent Docker volume (`kulcha-postgres-data`)
- Switching H2 <-> Postgres is done only by profile (`h2` or `postgres`)

---

## 11. Notes for Cursor

- Do not invent new backend contracts. Use existing endpoints exactly as above.
- Respect enum values exactly.
- Keep date-time as ISO strings from backend.
- For monetary values (`price`, `total`, etc.), use decimal-aware formatting in UI.
- If some backend fields are optional, handle nulls defensively in components.
