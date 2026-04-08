# KULCHA — Документация дипломного проекта

Подробное описание платформы заказов еды для небольших ресторанов и кафе (Food City, Москва) с веб-панелями и Telegram-ботами. Документ предназначен для использования в дипломной работе и подготовки пояснительной записки.

---

## 1. Обзор проекта

### 1.1 Назначение

**KULCHA** — это полнофункциональная платформа для заказа еды, интегрированная с Telegram. Система позволяет:

- **Клиентам** — просматривать рестораны и меню, формировать корзину, оформлять заказы (доставка или в зале), отслеживать статус через бота или мини-приложение.
- **Владельцам и сотрудникам ресторанов** — управлять меню, просматривать и обрабатывать заказы, видеть аналитику по выручке и заказам.
- **Платформе (суперадмин)** — управлять ресторанами, пользователями, курьерами, назначать права доступа, просматривать общую аналитику и системные инструменты.

### 1.2 Высокоуровневая архитектура

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           КЛИЕНТЫ (Clients)                              │
├─────────────────────────────────────────────────────────────────────────┤
│  user_panel        │  admin_panel       │  superadmin_panel              │
│  (Mini App)        │  (Mini App)        │  (Web Dashboard)               │
│  Клиент            │  Админ ресторана   │  Платформа                     │
├────────────────────┼────────────────────┼────────────────────────────────┤
│  user_bot          │  admin_bot        │  superadmin_bot                 │
│  (Telegram)        │  (Telegram)       │  (Telegram)                     │
│  Регистрация,      │  Меню, заказы,    │  Команды /health, /stats,       │
│  меню, Mini App    │  панель            │  /order, /restaurant, /user     │
└────────────────────┴────────────────────┴────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  backend_ (Java Spring Boot) — единый бэкенд                              │
│  Порт: 8080  │  Base path: /api/v1                                       │
│  БД: H2 (по умолчанию) или PostgreSQL                                    │
└─────────────────────────────────────────────────────────────────────────┘
```

Все фронтенды и боты обращаются к одному бэкенду по адресу `http://localhost:8080/api/v1`.

### 1.3 Структура репозитория

| Папка | Описание |
|-------|----------|
| **user_panel/** | Клиентское Telegram Mini App (React + Vite + TypeScript). Каталог ресторанов, меню, корзина, оформление заказа, профиль. |
| **admin_panel/** | Mini App для администратора ресторана. «Мои рестораны», заказы, меню, аналитика. |
| **superadmin_panel/** | Веб-дашборд платформы (не Mini App). Рестораны, пользователи, заказы, аналитика, инструменты разработчика. |
| **backend_/** | REST API на Java (Spring Boot 4.x, Java 17). Единственный серверный компонент для всех клиентов. |
| **backend/** | Устаревший прототип на Python (FastAPI), опционально; в текущей архитектуре не используется. |
| **bots/** | Три Python-бота на aiogram 3.x: user_bot, admin_bot, superadmin_bot. |

---

## 2. Backend (backend_)

### 2.1 Технологический стек

- **Язык:** Java 17  
- **Фреймворк:** Spring Boot 4.0.3  
- **Сборка:** Maven (`./mvnw`)  
- **Веб:** Spring Web MVC (REST)  
- **Данные:** Spring Data JPA  
- **БД по умолчанию:** H2 (in-memory; данные сбрасываются при перезапуске)  
- **БД для продакшена:** PostgreSQL (подключается через профиль `postgres`)  
- **Вспомогательно:** Lombok (DTO, сущности)

Пакет: `org.kulcha.backend`.

### 2.2 Структура backend_

```
backend_/
├── pom.xml
├── docker-compose.yml          # PostgreSQL для профиля postgres
├── README.md                   # Спецификация API и фронта для Cursor
└── src/main/java/org/kulcha/backend/
    ├── Application.java
    ├── config/                 # WebMvcConfig (CORS и т.д.)
    ├── controller/             # REST-контроллеры
    │   ├── UserController.java
    │   ├── RestaurantController.java
    │   ├── MealController.java
    │   ├── OrderController.java
    │   ├── OrderPositionController.java
    │   ├── StaffController.java
    │   ├── CourierController.java
    │   ├── CourierPanelController.java
    │   ├── AdminController.java
    │   └── SubscriptionLogController.java
    ├── dto/                    # DTO для запросов/ответов (camelCase)
    ├── model/                  # JPA-сущности
    │   ├── User.java, Restaurant.java, Meal.java, Order.java, OrderPosition.java
    │   ├── Staff.java, Courier.java, SubscriptionLog.java
    │   └── enums/              # OrderStatus, OrderType, MealCategory, StaffPermission
    ├── repository/             # JPA Repository
    └── service/                # Бизнес-логика
```

### 2.3 API (Base URL: `http://localhost:8080/api/v1`)

Имена полей в JSON — **camelCase** (например, `registeredAt`, `imageLink`, `orderType`).

#### Пользователи (Users)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/users?phone=&username=` | Список пользователей (фильтр). Возвращает `UserDto[]`. |
| GET | `/users/{id}` | Пользователь по id. |
| GET | `/users/{id}/my-restaurants` | Рестораны текущего пользователя (для админки). `UserRestaurantDto[]`. |
| POST | `/users` | Создание пользователя. Тело: username, phone, email?, address?. |
| PUT | `/users/{id}` | Обновление. |
| DELETE | `/users/{id}` | Удаление (204). |

**UserDto:** `id`, `username`, `phone`, `email`, `address`, `registeredAt` (ISO LocalDateTime).

**UserRestaurantDto:** `id`, `name`, `address`, `permissions` (массив `StaffPermission`).

#### Рестораны (Restaurants)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/restaurants` | Список ресторанов. |
| GET | `/restaurants/{id}` | Ресторан по id. |
| GET | `/restaurants/{id}/meals?category=&availableOnly=true|false` | Меню ресторана. `MealDto[]`. |

#### Блюда (Meals)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/meals?restaurantId=&category=` | Список блюд. |
| GET | `/meals/{id}` | Блюдо по id. |
| POST | `/meals` | Создание. |
| PUT | `/meals/{id}` | Обновление. |
| DELETE | `/meals/{id}` | Удаление (204). |

**MealDto:** `id`, `restaurantId`, `name`, `description`, `weight`, `calorie`, `imageLink`, `category`, `price`, `available`.

#### Заказы (Orders)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/orders?userId=&restaurantId=&status=` | Список заказов с фильтрами. |
| GET | `/orders/{id}` | Заказ по id. |
| POST | `/orders` | Создание заказа. |
| PUT | `/orders/{id}` | Обновление (в т.ч. смена статуса). |
| DELETE | `/orders/{id}` | Удаление (204). |

**OrderDto:** `id`, `status`, `userId`, `deliveryAddress`, `restaurantId`, `createdAt`, `updatedAt`, `courierId`, `orderType`, `itemsTotal`, `deliveryFee`, `serviceFee`, `total`.

Состав заказа (позиции) хранится отдельно в **Order Positions**.

#### Позиции заказа (Order Positions)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/order-positions?orderId=&mealId=` | Список позиций. |
| GET | `/order-positions/{id}` | Позиция по id. |
| POST | `/order-positions` | Добавление позиции к заказу. |
| PUT | `/order-positions/{id}` | Обновление. |
| DELETE | `/order-positions/{id}` | Удаление (204). |

**OrderPositionDto:** `id`, `mealId`, `orderId`, `quantity`, `unitPrice`, `totalPrice`.

Типичный сценарий создания заказа на фронте:  
1) `POST /orders` с телом OrderDto (userId, restaurantId, orderType, deliveryAddress, суммы, status=CREATED);  
2) для каждой позиции корзины — `POST /order-positions` с orderId из ответа, mealId, quantity, unitPrice, totalPrice.

#### Курьеры и панель курьера

- `GET/POST/PUT/DELETE /couriers`, `GET /couriers/{id}`.  
- `GET /courier-panel/{userId}` — обзор для курьера.  
- `GET /courier-panel/{userId}/delivery-orders`, `.../delivery-history`, `.../created-orders`.

#### Сотрудники ресторана (Staff)

- `GET/POST/PUT/DELETE /staff`, `GET /staff/{id}`. Параметры: `userId`, `restaurantId`, `permission`.  
- Права: `CAN_EDIT_MENU`, `CAN_LOOK_ORDERS`.

#### Админ (суперадмин)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/admin/users` | Обзор пользователей. |
| GET | `/admin/couriers` | Список курьеров. |
| GET | `/admin/restaurants` | Обзор ресторанов. |
| GET | `/admin/users/{userId}/restaurants` | Рестораны пользователя. |
| POST | `/admin/restaurants` | Создание ресторана. Тело: `name`, `address`, `adminUserId`. |
| POST | `/admin/couriers` | Назначить курьера. |
| POST | `/admin/restaurants/{restaurantId}/staff` | Назначить сотрудника. |
| DELETE | `/admin/couriers/{courierId}` | Снять с курьера (204). |

### 2.4 Перечисления (Enums)

- **MealCategory:** `FIRST`, `SECOND`, `SALAD`, `DESSERT`, `DRINK`.  
- **OrderStatus:** `CREATED`, `ACCEPTED`, `COOKING`, `DELIVERY`, `DONE`, `CANCELLED`.  
- **OrderType:** `DELIVERY`, `DINE_IN`.  
- **StaffPermission:** `CAN_EDIT_MENU`, `CAN_LOOK_ORDERS`.

В UI статусы заказа часто отображаются по-русски, например: CREATED → «В обработке», DELIVERY → «Отправлен», DONE → «Завершён».

### 2.5 Запуск backend_

**Вариант A — H2 (по умолчанию, для разработки):**

```bash
cd backend_
./mvnw spring-boot:run
```

или явно:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=h2
```

Консоль H2: `/h2-console`. Данные в памяти — при перезапуске сбрасываются.

**Вариант B — PostgreSQL (Docker):**

```bash
cd backend_
docker compose up -d postgres
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

Проверка: в браузере открыть `http://localhost:8080/api/v1/restaurants` — должен вернуться JSON (массив).

### 2.6 Ограничения и возможные доработки (для диплома)

- Нет JWT-авторизации. Во фронтах используется «сессия по выбранному userId» (localStorage).  
- Роли определяются по ответам API (например, наличие записей в `my-restaurants` или в списке курьеров).  
- Нет единого эндпоинта «заказ с позициями и названиями блюд» — админка может собирать данные через `GET /orders/{id}` + `GET /order-positions?orderId=`.  
- Аналитика (выручка за день/неделю/месяц) может считаться на фронте по списку заказов или выноситься в отдельные эндпоинты backend.  
- Для бота пользователей: в backend пока может не быть поля `telegram_id` у пользователя; регистрация по username/phone. При необходимости в дипломе можно описать доработку: хранение `telegram_id` и эндпоинт регистрации/поиска по нему.  
- Уведомления ботов (новый заказ, смена статуса) требуют webhook или очереди со стороны backend — можно описать как перспективу.

---

## 3. Frontend (панели)

Все три панели — SPA на **React + TypeScript + Vite**. Единый бэкенд: `VITE_API_URL` или `VITE_API_BASE_URL` = `http://localhost:8080/api/v1`.

### 3.1 User Panel (клиентское Mini App)

**Назначение:** клиент выбирает ресторан, просматривает меню, добавляет блюда в корзину, оформляет заказ (доставка или в зале), смотрит профиль. Рассчитан на запуск как Telegram Mini App.

**Стек:** React 19, React Router 7, TanStack Query 5, Vite 7, Tailwind CSS 4. Без axios — используется `fetch`.

**Структура `user_panel/src`:**

- **api/** — запросы к backend: `baseUrl.ts`, `restaurants.ts`, `meals.ts`, `orders.ts`, `users.ts`.  
- **types/** — типы: `restaurant`, `meal`, `order`, `user`, `cart`.  
- **context/** — `AuthContext` (текущий userId в localStorage), `CartContext`, `AppContext`.  
- **hooks/** — например, `useCurrentUser`.  
- **pages/** — Splash, CafeList, Menu, Cart, Checkout, Profile.  
- **layout/** — MiniAppShell, Header, BottomBarCart.  
- **components/** — карточки блюд, строки корзины и т.д.  
- **telegram/** — инициализация Telegram Web App (`initTelegram.ts`).  
- **router.tsx** — маршруты с lazy-загрузкой и Suspense.

**Маршруты:**

| Путь | Страница |
|------|----------|
| `/` | Splash (старт) |
| `/cafes` | Список ресторанов |
| `/cafes/:restaurantId/menu` | Меню ресторана |
| `/cart` | Корзина |
| `/checkout` | Оформление заказа |
| `/profile` | Профиль |

**Сессия пользователя:** в localStorage хранится `kulcha_current_user_id`. Если пользователь не выбран, приложение может перенаправлять на экран выбора/регистрации или показывать подсказку «откройте бота для регистрации». При создании заказа в API передаётся `userId` из контекста.

**Создание заказа:**  
1) `POST /orders` с полями OrderDto (status=CREATED, userId, restaurantId, orderType, deliveryAddress, itemsTotal, deliveryFee, serviceFee, total);  
2) для каждого элемента корзины — `POST /order-positions` (orderId из ответа, mealId, quantity, unitPrice, totalPrice). После успешного создания корзина очищается.

**Запуск:**

```bash
cd user_panel
npm install
npm run dev
```

Переменная окружения: `VITE_API_URL=http://localhost:8080/api/v1` (по умолчанию уже может быть прописана в коде).

---

### 3.2 Admin Panel (админ ресторана)

**Назначение:** владелец/сотрудник ресторана видит «свои» рестораны, заказы по ресторану, управляет меню (CRUD блюд), смотрит аналитику (выручка, заказы за период).

**Стек:** React 18, React Router 6, TanStack Query 5, Vite 7, Tailwind CSS 3.

**Структура `admin_panel/src`:**

- **api/** — `baseUrl.ts`, `adminRestaurants.ts`, `adminOrders.ts`, `adminMeals.ts`, `adminAnalytics.ts`.  
- **types/** — `adminRestaurant`, `adminOrder`, `adminMeal`, `adminAnalytics`.  
- **context/** — `AuthContext` (ключ `kulcha_admin_user_id`).  
- **pages/** — AdminCafeList (мои рестораны), AdminRestaurant (вкладки: заказы, меню, аналитика), AdminProfile.  
- **layout/** — AdminAppShell, AdminHeader.

**Логика «мои рестораны»:** для выбранного `currentUserId` вызывается `GET /users/{id}/my-restaurants`. Список ресторанов с правами отображается на первой странице. Заказы запрашиваются как `GET /orders?restaurantId={id}`. Статус обновляется через `PUT /orders/{id}` с новым `status`. Меню — `GET /meals?restaurantId=`, `POST/PUT/DELETE /meals`. Аналитика (сегодня/7 дней/30 дней, графики) может считаться на фронте по заказам или через отдельные эндпоинты backend (если будут добавлены).

**Запуск:**

```bash
cd admin_panel
npm install
npm run dev
```

---

### 3.3 Superadmin Panel (платформа)

**Назначение:** веб-дашборд для платформы (не Mini App). Разделы: рестораны (список, создание, детали), пользователи, заказы, аналитика, инструменты разработчика.

**Стек:** React 19, React Router 7, TanStack Query 5, Vite 8, Tailwind CSS 3.

**Структура `superadmin_panel/src`:**

- **api/** — `baseUrl.ts`, `admin.ts` (fetch к `/admin/restaurants`, `/admin/users`, `/orders`, создание ресторана).  
- **types/** — `admin.ts` (AdminRestaurantOverview, AdminUserOverview, CreateRestaurantRequest и т.д.).  
- **pages/** — RestaurantsPage, UsersPage, OrdersPage, AnalyticsPage, ToolsPage.  
- **layout/** — SuperadminShell (общая оболочка с навигацией).

**Маршруты (вложенные в shell):**

- `/` — рестораны  
- `/users` — пользователи  
- `/orders` — заказы  
- `/analytics` — аналитика  
- `/tools` — инструменты (здоровье, логи, фичи и т.п.)

**Авторизация:** как и в других панелях — «сессия по userId» или отдельный superadmin userId в localStorage; в перспективе — JWT или отдельный механизм входа.

**Запуск:**

```bash
cd superadmin_panel
npm install
npm run dev
```

---

### 3.4 Общее по фронтендам

- **Язык интерфейса:** русский (подписи кнопок, сообщения об ошибках, пустые состояния).  
- **Формат данных:** backend отдаёт camelCase; при необходимости во фронте можно маппить в snake_case для своих типов.  
- **Ошибки:** отображаются пользователю (тосты или блоки с текстом).  
- **Загрузка и пустые состояния:** должны быть на всех страницах с данными.  
- **Mobile-first:** важно для Mini App (user_panel, admin_panel); superadmin_panel — десктоп-ориентированный дашборд.

---

## 4. Telegram-боты (bots/)

Все боты написаны на **Python 3.10+**, фреймворк **aiogram 3.x**, асинхронные запросы к API — **httpx**. Конфигурация через `.env` в папке каждого бота (в репозитории не коммитится; есть `.env.example`).

Общий базовый URL API: `KULCHA_API_BASE=http://localhost:8080/api/v1`.

### 4.1 User Bot (`bots/user_bot/`)

**Роль:** клиентский бот — регистрация по номеру телефона, главное меню с кнопками, открытие Mini App (Заказать, Корзина, Профиль), статус заказа, поддержка.

**Файлы:** `main.py`, `config.py`, `handlers.py`, `keyboards.py`, `requirements.txt`.

**Зависимости:** aiogram>=3.13.0, httpx>=0.27.0, python-dotenv>=1.0.0.

**Переменные окружения (.env):**

- `KULCHA_USER_BOT_TOKEN` — токен от BotFather.  
- `KULCHA_API_BASE` — базовый URL API (по умолчанию `http://localhost:8080/api/v1`).  
- `KULCHA_USER_MINI_APP_URL` — базовый URL Mini App (без слэша в конце). Для HTTPS-ссылок кнопки могут открывать Web App; для localhost бот может просто отправлять текст с ссылкой.  
- `KULCHA_SUPPORT_LINK` — ссылка на поддержку (например, t.me/support).

**Логика:**

- **Команда /start:** запрос к `GET /users?username=...` (проверка по username или `tg_{id}`). Если пользователь найден — приветствие и главное меню. Если нет — просьба зарегистрироваться и кнопка «📱 Отправить номер».  
- **Получение контакта (F.contact):** `POST /users` с username, phone, email=null, address=null. При успехе — сообщение об успешной регистрации и главное меню.  
- **Кнопки главного меню (рус.):** «🍽 Заказать», «🧺 Корзина», «👤 Профиль», «📦 Статус заказа», «💬 Поддержка». Для «Заказать», «Корзина», «Профиль» при HTTPS открывается Mini App по соответствующему пути; иначе бот может отправить ссылку. «Статус заказа» может быть заглушкой с предложением открыть Mini App. «Поддержка» — отправка ссылки из `KULCHA_SUPPORT_LINK`.

**Запуск:**

```bash
cd bots/user_bot
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

---

### 4.2 Admin Bot (`bots/admin_bot/`)

**Роль:** бот для владельца/сотрудника ресторана — приветствие, кнопки «Активные заказы», «Открыть панель» (Mini App), «Итоги за сегодня», «Поддержка».

**Файлы:** `main.py`, `config.py`, `handlers.py`, `keyboards.py`, `requirements.txt`.

**Переменные окружения:**

- `KULCHA_ADMIN_BOT_TOKEN`  
- `KULCHA_API_BASE`  
- `KULCHA_ADMIN_MINI_APP_URL` — URL админ-панели (Mini App).  
- `KULCHA_SUPPORT_LINK`

**Логика:**

- **/start:** приветствие «Панель администратора KULCHA» и reply-клавиатура.  
- «🍽 Открыть панель» — при HTTPS кнопка как Web App; при HTTP (localhost) бот отправляет текст с ссылкой для открытия в браузере.  
- «📥 Активные заказы» — сообщение о том, что список активных заказов доступен в панели.  
- «📊 Итоги за сегодня» — отсылка к вкладке «Аналитика» в панели.  
- «💬 Поддержка» — ссылка из конфига.

В перспективе: уведомления о новых заказах (при появлении webhook/очереди в backend) и inline-кнопки для смены статуса заказа.

**Запуск:** аналогично user_bot, из папки `bots/admin_bot`.

---

### 4.3 Superadmin Bot (`bots/superadmin_bot/`)

**Роль:** бот для разработчиков/операторов платформы. Доступ можно ограничить списком telegram_id. Команды: проверка здоровья API, краткая статистика, информация о заказе, ресторане, пользователе.

**Файлы:** `main.py`, `config.py`, `handlers.py`, `requirements.txt`.

**Переменные окружения:**

- `KULCHA_SUPERADMIN_BOT_TOKEN`  
- `KULCHA_API_BASE`  
- `KULCHA_SUPERADMIN_ALLOWED_IDS` — опционально; список telegram_id через запятую. Если пусто — доступ у всех (удобно для локальной разработки).

**Команды (все ответы на русском):**

- **/start** — приветствие и список команд. Если включён allowlist и id пользователя нет в списке — «Нет доступа.»  
- **/health** — GET к `{API_BASE}/restaurants`. При 200 — «Сервисы: ОК», иначе «Сервисы: ошибка».  
- **/stats** — запросы к `/orders` и `/restaurants`; ответ: количество ресторанов, количество заказов, сумма заказов (текст «Статистика за сегодня»).  
- **/order &lt;id&gt;** — GET `/orders/{id}`. Вывод: id, status, total, orderType.  
- **/restaurant &lt;id&gt;** — GET `/restaurants/{id}`. Вывод: id, name, address.  
- **/user &lt;userId&gt;** — GET `/users/{userId}`. Вывод: id, username, phone.

Перед выполнением команд проверяется `allowed(message.from_user.id)`.

**Запуск:** из папки `bots/superadmin_bot`, так же через venv и `python main.py`.

---

### 4.4 Запуск всех ботов

Бэкенд должен быть запущен. В трёх терминалах:

```bash
# Терминал 1
cd bots/user_bot && source venv/bin/activate && python main.py

# Терминал 2
cd bots/admin_bot && source venv/bin/activate && python main.py

# Терминал 3
cd bots/superadmin_bot && source venv/bin/activate && python main.py
```

---

## 5. Сводка по интеграции

| Компонент | Как подключается к backend |
|-----------|----------------------------|
| user_panel | `VITE_API_URL` → GET restaurants, meals; POST orders + order-positions; GET/POST users. |
| admin_panel | `VITE_API_URL` → GET users/{id}/my-restaurants; GET/PUT orders; GET/POST/PUT/DELETE meals; аналитика по заказам. |
| superadmin_panel | Тот же base URL → GET admin/restaurants, admin/users, orders; POST admin/restaurants. |
| user_bot | httpx → GET /users (поиск), POST /users (регистрация). |
| admin_bot | Пока без прямых вызовов API (меню и подсказки); в перспективе — уведомления и смена статусов. |
| superadmin_bot | httpx → GET /restaurants (health), /orders, /restaurants, /users для команд /health, /stats, /order, /restaurant, /user. |

---

## 6. Быстрый старт для проверки системы

1. **Backend:**  
   `cd backend_ && ./mvnw spring-boot:run`  
   Проверка: `http://localhost:8080/api/v1/restaurants`.

2. **User panel:**  
   `cd user_panel && npm install && npm run dev`.

3. **Admin panel:**  
   `cd admin_panel && npm install && npm run dev`.

4. **Superadmin panel:**  
   `cd superadmin_panel && npm install && npm run dev`.

5. **Боты:** в каждом каталоге бота создать `.env` из `.env.example`, подставить токены и при необходимости URL Mini App и API; затем запустить `python main.py` (после venv и pip install).

Для Mini App в Telegram нужны HTTPS-ссылки на собранные фронты (или туннель, например ngrok). Локально панели можно открывать в браузере по выданному Vite URL.

---

## 7. Рекомендуемые разделы для дипломной работы

Ниже перечислены темы, которые можно раскрыть в пояснительной записке и презентации, опираясь на этот документ и код.

1. **Введение:** цель и задачи проекта; целевая аудитория (клиенты, рестораны, платформа); обоснование выбора стека (Java backend, React фронты, Python боты).  
2. **Анализ предметной области:** сценарии заказа еды, роли (клиент, администратор ресторана, суперадмин, курьер); требования к функционалу и к интеграции с Telegram.  
3. **Проектирование системы:** архитектура «один backend — много клиентов»; диаграммы компонентов и взаимодействия (как в разделе 1.2); описание REST API и основных DTO.  
4. **Реализация backend:** технологический стек Spring Boot, JPA, H2/PostgreSQL; структура пакетов; основные эндпоинты и бизнес-логика (заказы, позиции, рестораны, пользователи, права).  
5. **Реализация фронтендов:** различия трёх панелей (user, admin, superadmin); организация кода (api, types, context, pages); работа с TanStack Query; «сессия по userId» и перспектива JWT.  
6. **Реализация Telegram-ботов:** назначение каждого бота; aiogram, обработчики и клавиатуры; вызовы backend через httpx; ограничение доступа (superadmin allowlist).  
7. **Тестирование:** ручное тестирование сценариев (регистрация, заказ, смена статуса, админ-меню); при наличии — автотесты backend (JUnit) и описание покрытия.  
8. **Развёртывание и эксплуатация:** запуск backend (H2/PostgreSQL), сборка фронтов (npm run build), настройка ботов и переменных окружения; требования к HTTPS для Mini App.  
9. **Заключение и перспективы:** что реализовано; возможные доработки (JWT, эндпоинт «заказ с позициями», аналитика на backend, telegram_id у пользователя, webhook для уведомлений ботов).

Используйте этот документ как единый источник фактов о системе при подготовке текста диплома и при запросах к GPT для формулировок разделов, описания API и архитектуры.
