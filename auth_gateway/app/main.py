"""
Mini-app login: validates Telegram WebApp initData, then calls Java internal API.
Run: uvicorn app.main:app --host 127.0.0.1 --port 8090
"""

from __future__ import annotations

import os
from typing import Any

import httpx
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.telegram_auth import verify_telegram_init_data

app = FastAPI(title="Kulcha auth-gateway", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JAVA_BASE = os.environ.get("KULCHA_JAVA_API_BASE", "http://127.0.0.1:8080/api/v1").rstrip("/")
INTERNAL_SECRET = os.environ.get("KULCHA_INTERNAL_API_SECRET", "")
USER_BOT_TOKEN = os.environ.get("KULCHA_USER_BOT_TOKEN", "")
ADMIN_BOT_TOKEN = os.environ.get("KULCHA_ADMIN_BOT_TOKEN", "")


async def _proxy_to_java(path: str, payload: dict[str, Any]) -> Any:
    if not INTERNAL_SECRET:
        raise HTTPException(
            503,
            "KULCHA_INTERNAL_API_SECRET is not set (required for auth-gateway → Java)",
        )
    url = f"{JAVA_BASE}{path}"
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(
            url,
            headers={
                "X-Kulcha-Internal-Secret": INTERNAL_SECRET,
                "Content-Type": "application/json",
            },
            json=payload,
        )
    if r.status_code == 401:
        raise HTTPException(401, r.text or "Unauthorized")
    if r.status_code == 403:
        raise HTTPException(403, r.text or "Forbidden")
    if r.status_code == 503:
        raise HTTPException(503, r.text or "Service unavailable")
    if not r.is_success:
        raise HTTPException(r.status_code, r.text or "Upstream error")
    return r.json()


@app.post("/api/v1/auth/webapp-user")
async def webapp_user(
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
):
    init = (x_telegram_init_data or x_init_data or "").strip()
    if not init:
        raise HTTPException(401, "Missing Telegram WebApp data")

    if not USER_BOT_TOKEN:
        raise HTTPException(503, "KULCHA_USER_BOT_TOKEN is not configured")

    user = verify_telegram_init_data(init, USER_BOT_TOKEN)
    if not user:
        raise HTTPException(401, "Invalid Telegram init data")

    tid = user.get("id")
    if tid is None:
        raise HTTPException(401, "No user id in init data")

    return await _proxy_to_java(
        "/internal/auth/webapp-user",
        {
            "telegramId": int(tid),
            "username": user.get("username"),
            "firstName": user.get("first_name") or "",
        },
    )


@app.post("/api/v1/auth/webapp-admin")
async def webapp_admin(
    x_telegram_init_data: str | None = Header(None, alias="X-Telegram-Init-Data"),
    x_init_data: str | None = Header(None, alias="X-Init-Data"),
):
    init = (x_telegram_init_data or x_init_data or "").strip()
    if not init:
        raise HTTPException(401, "Missing Telegram WebApp data")

    if not ADMIN_BOT_TOKEN:
        raise HTTPException(503, "KULCHA_ADMIN_BOT_TOKEN is not configured")

    user = verify_telegram_init_data(init, ADMIN_BOT_TOKEN)
    if not user:
        raise HTTPException(401, "Invalid Telegram init data")

    tid = user.get("id")
    if tid is None:
        raise HTTPException(401, "No user id in init data")

    return await _proxy_to_java(
        "/internal/auth/webapp-admin",
        {
            "telegramId": int(tid),
            "username": user.get("username"),
            "firstName": user.get("first_name") or "",
        },
    )


@app.get("/health")
async def health():
    return {"status": "ok"}
