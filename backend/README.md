# Kulcha Backend (Python FastAPI)

## Quick start

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set required env vars (or create .env file)
export KULCHA_DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/kulcha
export KULCHA_USER_BOT_TOKEN=your_user_bot_token
export KULCHA_ADMIN_BOT_TOKEN=your_admin_bot_token
export KULCHA_INTERNAL_API_SECRET=your_shared_secret

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Health check: `GET http://localhost:8000/health`

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `KULCHA_DATABASE_URL` | Yes | `postgresql+asyncpg://postgres:postgres@localhost:5432/kulcha` | Async Postgres connection string |
| `KULCHA_USER_BOT_TOKEN` | Yes | — | Telegram bot token for user mini-app |
| `KULCHA_ADMIN_BOT_TOKEN` | Yes | — | Telegram bot token for admin mini-app |
| `KULCHA_INTERNAL_API_SECRET` | Yes | — | Shared secret for bot-to-backend calls (PATCH order status) |
| `KULCHA_BOT_API_SECRET` | No | — | Optional secret for POST /users from bots |
| `KULCHA_UPLOADS_DIR` | No | `./uploads` | Directory for meal image uploads |
| `KULCHA_CORS_ADDITIONAL_ORIGINS` | No | — | Extra CORS origins (JSON list) |

## Database migrations

```bash
# Generate a new migration after model changes
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

## API

All endpoints are under `/api/v1/`. Interactive docs at `http://localhost:8000/docs`.

## Docker (production)

```bash
docker compose up -d
```
