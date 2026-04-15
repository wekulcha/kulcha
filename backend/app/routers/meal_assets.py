from __future__ import annotations

import re
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, Header, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_db
from app.models.user import User
from app.services import staff_access
from app.services.telegram_auth import verify_telegram_init_data

router = APIRouter(prefix="/api/v1/meal-assets", tags=["meal-assets"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}


@router.post("/upload")
async def upload(
    restaurantId: int,
    file: UploadFile,
    db: AsyncSession = Depends(get_db),
    x_telegram_init_data: str = Header(..., alias="X-Telegram-Init-Data"),
):
    settings = get_settings()
    tg = verify_telegram_init_data(x_telegram_init_data, settings.admin_bot_token)
    if not tg:
        raise HTTPException(401, "Invalid Telegram init data")
    result = await db.execute(select(User).where(User.id == tg["id"]))
    actor = result.scalars().first()
    if not actor:
        raise HTTPException(403, "Unknown user")
    await staff_access.require_can_edit_menu(db, actor.id, restaurantId)

    if not file.size:
        raise HTTPException(400, "Empty file")
    ct = (file.content_type or "").lower()
    if ct not in ALLOWED_TYPES:
        raise HTTPException(400, "Only JPG, JPEG, PNG allowed")

    ext = ".png" if ct == "image/png" else ".jpg"
    name = f"{uuid.uuid4()}{ext}"
    dir_path = Path(settings.uploads_dir, "meals").resolve()
    dir_path.mkdir(parents=True, exist_ok=True)
    target = (dir_path / name).resolve()
    if not str(target).startswith(str(dir_path)):
        raise HTTPException(400, "Invalid path")

    content = await file.read()
    target.write_bytes(content)

    return {"path": f"/api/v1/meal-assets/{name}"}


@router.get("/{filename}")
async def serve(filename: str):
    if not re.match(r"^[a-zA-Z0-9._-]+$", filename):
        raise HTTPException(400, "Invalid filename")

    settings = get_settings()
    dir_path = Path(settings.uploads_dir, "meals").resolve()
    file_path = (dir_path / filename).resolve()
    if not str(file_path).startswith(str(dir_path)) or not file_path.is_file():
        raise HTTPException(404)

    media_type = "image/png" if filename.lower().endswith(".png") else "image/jpeg"
    return FileResponse(
        file_path,
        media_type=media_type,
        headers={"Cache-Control": "public, max-age=31536000"},
    )
