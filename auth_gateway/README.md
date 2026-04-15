# auth_gateway (Python)

Проверяет Telegram WebApp **initData** (как kickoff) и вызывает Java `POST /api/v1/internal/auth/webapp-user|webapp-admin` с `X-Kulcha-Internal-Secret`.

## Запуск процесса

Нужны переменные:

- `KULCHA_INTERNAL_API_SECRET` — общий секрет с бэкендом (обязательно)
- `KULCHA_USER_BOT_TOKEN`, `KULCHA_ADMIN_BOT_TOKEN`
- `KULCHA_JAVA_API_BASE` — база API Java, по умолчанию `http://127.0.0.1:8080/api/v1`

Пример:

```bash
cd auth_gateway && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
export KULCHA_JAVA_API_BASE=http://127.0.0.1:8080/api/v1
export KULCHA_INTERNAL_API_SECRET=...
export KULCHA_USER_BOT_TOKEN=...
export KULCHA_ADMIN_BOT_TOKEN=...
./venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8090
```

## Прод

Nginx (или аналог): маршруты `POST /api/v1/auth/webapp-user` и `POST /api/v1/auth/webapp-admin` → процесс auth_gateway; остальной `/api/v1/*` → Spring. Секрет и токены ботов — в переменных окружения сервиса, не в репозитории.
