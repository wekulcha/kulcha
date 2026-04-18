import os

BOT_TOKEN = os.environ.get("KULCHA_SUPPORT_BOT_TOKEN", "")
API_BASE = os.environ.get("KULCHA_API_BASE", "http://localhost:8000/api/v1")
INTERNAL_SECRET = os.environ.get("KULCHA_INTERNAL_API_SECRET", "")
# ID группы: для супергрупп обычно -100XXXXXXXXXX
SUPPORT_GROUP_ID = int(os.environ.get("KULCHA_SUPPORT_GROUP_ID", "-1003920291106"))
