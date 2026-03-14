import os

BOT_TOKEN = os.environ.get("KULCHA_USER_BOT_TOKEN", "")
API_BASE = os.environ.get("KULCHA_API_BASE", "http://localhost:8080/api/v1")
# Базовый URL мини-приложения пользователя (без слэша в конце). Пример: https://your-domain.com или ngrok URL
USER_MINI_APP_BASE = (os.environ.get("KULCHA_USER_MINI_APP_URL") or "https://kulcha-user.example.com").rstrip("/")
SUPPORT_LINK = os.environ.get("KULCHA_SUPPORT_LINK", "https://t.me/support")
