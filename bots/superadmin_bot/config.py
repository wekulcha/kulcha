import os

BOT_TOKEN = os.environ.get("KULCHA_SUPERADMIN_BOT_TOKEN", "")
API_BASE = os.environ.get("KULCHA_API_BASE", "http://localhost:8080/api/v1")
ALLOWED_TELEGRAM_IDS: set[int] = set(
    int(x) for x in os.environ.get("KULCHA_SUPERADMIN_ALLOWED_IDS", "").split(",") if x.strip().isdigit()
)
