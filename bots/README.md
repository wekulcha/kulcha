# KULCHA Telegram Bots

Три бота: для пользователей, для администраторов ресторанов и для суперадминов.

## Общие требования

- Python 3.10+
- Токены и настройки хранятся в файлах `.env` в папке каждого бота (файлы уже созданы, в git не попадают).

---

## Как запустить и проверить локально

### 1. Бэкенд (обязательно для ботов, которые ходят в API)

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Проверка: `http://localhost:8000/health` — должен вернуться `{"status":"ok"}`.

### 2. User Bot

```bash
cd bots/user_bot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

В Telegram найди своего бота по username (из BotFather) и отправь `/start`.

### 3. Admin Bot

```bash
cd bots/admin_bot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### 4. Superadmin Bot

```bash
cd bots/superadmin_bot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

---

## Переменные (.env)

В каждой папке бота уже есть `.env` с токеном. При необходимости скопируй `.env.example` в `.env` и подставь свои значения.

- **User bot:** `KULCHA_USER_BOT_TOKEN`, `KULCHA_API_BASE`, `KULCHA_USER_MINI_APP_URL`, `KULCHA_SUPPORT_LINK`
- **Admin bot:** `KULCHA_ADMIN_BOT_TOKEN`, `KULCHA_API_BASE`, `KULCHA_ADMIN_MINI_APP_URL`, `KULCHA_SUPPORT_LINK`
- **Superadmin bot:** `KULCHA_SUPERADMIN_BOT_TOKEN`, `KULCHA_API_BASE`, `KULCHA_SUPERADMIN_ALLOWED_IDS` (опционально)

`KULCHA_API_BASE` по умолчанию `http://localhost:8000/api/v1`.
