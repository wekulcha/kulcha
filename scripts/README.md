# Переменные окружения

Пример значений — **`kulcha-dev.env.example`**. Файл **`kulcha-dev.env`** (копия с секретами) в `.gitignore`, не коммитьте.

Для **Spring**, **auth_gateway**, **ботов** нужны в том числе:

- `KULCHA_USER_BOT_TOKEN`, `KULCHA_ADMIN_BOT_TOKEN`
- `KULCHA_INTERNAL_API_SECRET` (общий для Java и Python auth_gateway)

См. также **`auth_gateway/README.md`**, **`backend/src/main/resources/application.yaml`**.
