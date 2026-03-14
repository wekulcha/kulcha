# KULCHA

Telegram-based ordering platform for small restaurants/cafes (Food City, Moscow).

## Structure

- **user_panel/** — Customer Telegram Mini App (restaurants, menu, cart, checkout, profile)
- **admin_panel/** — Restaurant admin Mini App (orders, menu, analytics)
- **superadmin_panel/** — Platform dashboard (restaurants, users, orders, tools)
- **backend_/** — Java Spring Boot API (port 8080, `/api/v1`)
- **backend/** — Legacy Python FastAPI prototype (optional)
- **bots/** — Telegram bots (user_bot, admin_bot, superadmin_bot)

## Quick start

**Backend (Java):**
```bash
cd backend_ && ./mvnw spring-boot:run
```

**User panel:** `cd user_panel && npm install && npm run dev`  
**Admin panel:** `cd admin_panel && npm install && npm run dev`  
**Superadmin panel:** `cd superadmin_panel && npm install && npm run dev`

Set `VITE_API_URL=http://localhost:8080/api/v1` for frontends (or use default in code).

**Рекомендуемые доработки backend_ (Phase 6):**
- Эндпоинт деталей заказа с позициями и названиями блюд (например `GET /orders/{id}/details`) для админки и суперадмина.
- Аналитика по ресторану: today/7d/30d сводка и дневная серия (сейчас считается на фронте в admin_panel).
- Поддержка `telegram_id` у пользователя и эндпоинт регистрации/поиска по telegram_id для User Bot.
- Webhook или очередь для уведомлений ботов (новый заказ, смена статуса).
