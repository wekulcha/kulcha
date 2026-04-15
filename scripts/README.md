# Переменные окружения

Пример значений — **`kulcha-dev.env.example`**. Файл **`kulcha-dev.env`** (копия с секретами) в `.gitignore`, не коммитьте.

Для **бэкенда** и **ботов** нужны:

- `KULCHA_DATABASE_URL` — строка подключения к PostgreSQL
- `KULCHA_USER_BOT_TOKEN`, `KULCHA_ADMIN_BOT_TOKEN`
- `KULCHA_INTERNAL_API_SECRET` (общий для бэкенда и ботов)

См. также **`backend/README.md`**.
