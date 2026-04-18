# Переменные окружения

Пример значений — **`kulcha-dev.env.example`**. Файл **`kulcha-dev.env`** (копия с секретами) в `.gitignore`, не коммитьте.

Для **бэкенда** и **ботов** нужны:

- `KULCHA_DATABASE_URL` — строка подключения к PostgreSQL
- `KULCHA_USER_BOT_TOKEN`, `KULCHA_ADMIN_BOT_TOKEN`
- `KULCHA_INTERNAL_API_SECRET` (общий для бэкенда и ботов)
- `KULCHA_OBJECT_STORAGE_ACCESS_KEY_ID`, `KULCHA_OBJECT_STORAGE_SECRET_ACCESS_KEY`

См. также **`backend/README.md`**.
