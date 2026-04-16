from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/kulcha"

    user_bot_token: str = ""
    admin_bot_token: str = ""

    auth_access_secret: str = ""
    auth_access_ttl_minutes: int = 15
    auth_refresh_ttl_days: int = 30
    auth_cookie_domain: str = ""
    auth_cookie_secure: bool = True

    internal_api_secret: str = ""
    bot_api_secret: str = ""

    uploads_dir: str = "./uploads"

    cors_additional_origins: list[str] = []

    model_config = {
        "env_prefix": "KULCHA_",
        "env_file": ".env",
        "extra": "ignore",
    }


@lru_cache
def get_settings() -> Settings:
    return Settings()
