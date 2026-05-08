import os
from pathlib import Path


DEFAULT_BOT_TOKEN = "8653190572:AAGMbnk-FGktiB5iIMMEh9kKPMs7xd4Q0TA"

BASE_DIR = Path(__file__).resolve().parent

BOT_TOKEN = os.environ.get("KULCHA_CHANNEL_SUBSCRIPTIONS_BOT_TOKEN", DEFAULT_BOT_TOKEN).strip()
DB_PATH = Path(
    os.environ.get(
        "KULCHA_CHANNEL_SUBSCRIPTIONS_DB",
        str(BASE_DIR / "subscriptions.sqlite3"),
    )
)
TIMEZONE = os.environ.get("KULCHA_CHANNEL_SUBSCRIPTIONS_TZ", "Europe/Moscow").strip()
