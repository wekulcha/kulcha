# KULCHA Telegram Bots

Три бота: для пользователей, для администраторов ресторанов и для суперадминов.

## Общие требования

- Python 3.10+
- Токены и настройки хранятся в файлах `.env` в папке каждого бота (файлы уже созданы, в git не попадают).

---

## Как запустить и проверить локально

### 1. Бэкенд (обязательно для ботов, которые ходят в API)

```bash
cd backend_
./mvnw spring-boot:run
```

Проверка: открой в браузере `http://localhost:8080/api/v1/restaurants` — должен вернуться JSON.

### 2. User Bot

```bash
cd bots/user_bot
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

В Telegram найди своего бота по username (из BotFather) и отправь `/start`. Должно появиться приветствие и кнопка «📱 Отправить номер» (если пользователь ещё не в БД) или меню с кнопками (Заказать, Корзина, Профиль, Статус заказа, Поддержка).

### 3. Admin Bot

```bash
cd bots/admin_bot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

В Telegram открой бота админки, отправь `/start` — должно показаться меню (Активные заказы, Открыть панель, Итоги за сегодня, Поддержка).

### 4. Superadmin Bot

```bash
cd bots/superadmin_bot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

В Telegram открой бота суперадмина. Отправь `/start` — приветствие. Команды: `/health`, `/stats`, `/order 1`, `/restaurant 1`, `/user 1`. Если в `.env` задан `KULCHA_SUPERADMIN_ALLOWED_IDS`, доступ только у перечисленных telegram_id; если пусто — у всех (удобно для локальной проверки).

### Запуск всех трёх ботов сразу (в разных терминалах)

Терминал 1 (user bot):

```bash
cd bots/user_bot && source venv/bin/activate && python main.py
```

Терминал 2 (admin bot):

```bash
cd bots/admin_bot && source venv/bin/activate && python main.py
```

Терминал 3 (superadmin bot):

```bash
cd bots/superadmin_bot && source venv/bin/activate && python main.py
```

---

## Переменные (.env)

В каждой папке бота уже есть `.env` с токеном. При необходимости скопируй `.env.example` в `.env` и подставь свои значения.

- **User bot:** `KULCHA_USER_BOT_TOKEN`, `KULCHA_API_BASE`, `KULCHA_USER_MINI_APP_URL`, `KULCHA_SUPPORT_LINK`
- **Admin bot:** `KULCHA_ADMIN_BOT_TOKEN`, `KULCHA_API_BASE`, `KULCHA_ADMIN_MINI_APP_URL`, `KULCHA_SUPPORT_LINK`
- **Superadmin bot:** `KULCHA_SUPERADMIN_BOT_TOKEN`, `KULCHA_API_BASE`, `KULCHA_SUPERADMIN_ALLOWED_IDS` (опционально)
