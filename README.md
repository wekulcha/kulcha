# KULCHA

Telegram-based ordering platform for small restaurants/cafes.

## Services in this repo

- `backend/` - Java Spring Boot API (`/api/v1`)
- `user_panel/` - customer Telegram Mini App
- `admin_panel/` - restaurant admin panel
- `superadmin_panel/` - superadmin panel
- `bots/` - `user_bot`, `admin_bot`, `superadmin_bot`

## One-command deploy on VM (Docker Compose)

This repository includes production compose for all services:

- Postgres
- Backend API
- 3 frontend panels
- 3 Telegram bots
- Caddy reverse proxy with automatic HTTPS

### 1. Prepare DNS

Point these domains to your VM public static IP:

- `api.wekulcha.ru`
- `app.wekulcha.ru`
- `admin.wekulcha.online`
- `superadmin.wekulcha.online`

### 2. Configure environment

```bash
cp .env.example .env
```

Fill values in `.env`:

- database password
- bot tokens
- support link
- ACME email

If you previously ran backend/postgres manually on VM, stop old services first:

```bash
sudo systemctl disable --now kulcha-backend || true
cd backend && docker compose down || true
docker rm -f kulcha-postgres || true
```

### 3. Start everything

```bash
./deploy/up.sh
```

Equivalent manual command:

```bash
docker compose up -d --build
```

### 4. Logs and status

```bash
docker compose ps
docker compose logs -f gateway
docker compose logs -f backend
```

### 5. Stop

```bash
./deploy/down.sh
```

## Local development

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Frontends:

```bash
cd user_panel && npm install && npm run dev
cd admin_panel && npm install && npm run dev
cd superadmin_panel && npm install && npm run dev
```

For frontends:

```bash
VITE_API_URL=http://localhost:8080/api/v1
```
