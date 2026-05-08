import logging
import sqlite3
from datetime import datetime, timezone
from html import escape
from pathlib import Path
from typing import Optional
from zoneinfo import ZoneInfo

from telegram import Chat, Update, User
from telegram.error import Forbidden, TelegramError
from telegram.ext import Application, ChatMemberHandler, CommandHandler, ContextTypes


BOT_TOKEN = "8653190572:AAGMbnk-FGktiB5iIMMEh9kKPMs7xd4Q0TA"

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "subscriptions.sqlite3"
LOCAL_TZ = ZoneInfo("Europe/Moscow")

ACTIVE_STATUSES = {"creator", "administrator", "member"}
INACTIVE_STATUSES = {"left", "kicked"}

logger = logging.getLogger(__name__)


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def format_local_time(value: datetime) -> str:
    return value.astimezone(LOCAL_TZ).strftime("%d.%m.%Y %H:%M:%S %Z")


def full_name(user: User) -> str:
    name_parts = [part for part in [user.first_name, user.last_name] if part]
    return " ".join(name_parts) or "Unknown"


def user_label(user: User) -> str:
    chunks = [full_name(user)]
    if user.username:
        chunks.append(f"@{user.username}")
    chunks.append(f"id: {user.id}")
    return ", ".join(chunks)


def chat_label(chat: Chat) -> str:
    title = chat.title or str(chat.id)
    if chat.username:
        return f"{title} (@{chat.username})"
    return title


def is_active_member(member) -> bool:
    if member.status == "restricted":
        return bool(getattr(member, "is_member", False))
    return member.status in ACTIVE_STATUSES


class Storage:
    def __init__(self, path: Path):
        self.path = path
        self.init_db()

    def connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.path)
        connection.row_factory = sqlite3.Row
        return connection

    def init_db(self) -> None:
        with self.connect() as connection:
            connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS owners (
                    user_id INTEGER PRIMARY KEY,
                    username TEXT,
                    first_name TEXT,
                    last_name TEXT,
                    registered_at TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS channels (
                    chat_id INTEGER PRIMARY KEY,
                    title TEXT,
                    username TEXT,
                    owner_user_id INTEGER NOT NULL,
                    bot_status TEXT NOT NULL,
                    bound_at TEXT NOT NULL,
                    FOREIGN KEY(owner_user_id) REFERENCES owners(user_id)
                );

                CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    chat_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    username TEXT,
                    full_name TEXT,
                    event_type TEXT NOT NULL,
                    old_status TEXT NOT NULL,
                    new_status TEXT NOT NULL,
                    event_time_utc TEXT NOT NULL,
                    actor_user_id INTEGER
                );
                """
            )

    def upsert_owner(self, user: User) -> None:
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO owners (user_id, username, first_name, last_name, registered_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(user_id) DO UPDATE SET
                    username = excluded.username,
                    first_name = excluded.first_name,
                    last_name = excluded.last_name
                """,
                (
                    user.id,
                    user.username,
                    user.first_name,
                    user.last_name,
                    utc_now().isoformat(),
                ),
            )

    def owner_exists(self, user_id: int) -> bool:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT 1 FROM owners WHERE user_id = ?",
                (user_id,),
            ).fetchone()
            return row is not None

    def bind_channel(self, chat: Chat, owner_user_id: int, bot_status: str) -> None:
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO channels (chat_id, title, username, owner_user_id, bot_status, bound_at)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(chat_id) DO UPDATE SET
                    title = excluded.title,
                    username = excluded.username,
                    owner_user_id = excluded.owner_user_id,
                    bot_status = excluded.bot_status
                """,
                (
                    chat.id,
                    chat.title,
                    chat.username,
                    owner_user_id,
                    bot_status,
                    utc_now().isoformat(),
                ),
            )

    def unbind_channel(self, chat_id: int) -> Optional[int]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT owner_user_id FROM channels WHERE chat_id = ?",
                (chat_id,),
            ).fetchone()
            connection.execute("DELETE FROM channels WHERE chat_id = ?", (chat_id,))
            return int(row["owner_user_id"]) if row else None

    def get_channel_owner(self, chat_id: int) -> Optional[int]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT owner_user_id FROM channels WHERE chat_id = ?",
                (chat_id,),
            ).fetchone()
            return int(row["owner_user_id"]) if row else None

    def list_channels_for_owner(self, owner_user_id: int) -> list[sqlite3.Row]:
        with self.connect() as connection:
            return connection.execute(
                """
                SELECT chat_id, title, username, bound_at
                FROM channels
                WHERE owner_user_id = ?
                ORDER BY bound_at DESC
                """,
                (owner_user_id,),
            ).fetchall()

    def record_event(
        self,
        chat_id: int,
        user: User,
        event_type: str,
        old_status: str,
        new_status: str,
        event_time: datetime,
        actor_user_id: Optional[int],
    ) -> None:
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO events (
                    chat_id,
                    user_id,
                    username,
                    full_name,
                    event_type,
                    old_status,
                    new_status,
                    event_time_utc,
                    actor_user_id
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    chat_id,
                    user.id,
                    user.username,
                    full_name(user),
                    event_type,
                    old_status,
                    new_status,
                    event_time.isoformat(),
                    actor_user_id,
                ),
            )


def get_storage(context: ContextTypes.DEFAULT_TYPE) -> Storage:
    return context.application.bot_data["storage"]


async def send_owner_message(
    context: ContextTypes.DEFAULT_TYPE,
    owner_user_id: int,
    text: str,
) -> None:
    try:
        await context.bot.send_message(
            chat_id=owner_user_id,
            text=text,
            parse_mode="HTML",
            disable_web_page_preview=True,
        )
    except Forbidden:
        logger.warning("Cannot message owner %s. User has not opened the bot.", owner_user_id)
    except TelegramError:
        logger.exception("Failed to send owner notification to %s", owner_user_id)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.effective_chat is None or update.effective_user is None:
        return

    if update.effective_chat.type != Chat.PRIVATE:
        await update.effective_message.reply_text("Напиши мне /start в личные сообщения.")
        return

    storage = get_storage(context)
    storage.upsert_owner(update.effective_user)

    await update.effective_message.reply_text(
        "Готово, я тебя запомнил.\n\n"
        "Теперь добавь меня администратором в канал. "
        "Когда кто-то подпишется или отпишется, я пришлю событие сюда."
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.effective_message is None:
        return

    await update.effective_message.reply_text(
        "Команды:\n"
        "/start - запомнить тебя как владельца\n"
        "/channels - показать привязанные каналы\n\n"
        "После /start добавь меня администратором в канал, и я начну присылать события подписок."
    )


async def channels_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.effective_user is None or update.effective_message is None:
        return

    storage = get_storage(context)
    rows = storage.list_channels_for_owner(update.effective_user.id)

    if not rows:
        await update.effective_message.reply_text("Пока нет привязанных каналов.")
        return

    lines = ["Привязанные каналы:"]
    for row in rows:
        username = f" (@{row['username']})" if row["username"] else ""
        lines.append(f"- {row['title'] or row['chat_id']}{username}")

    await update.effective_message.reply_text("\n".join(lines))


async def resolve_owner_user_id(
    update,
    context: ContextTypes.DEFAULT_TYPE,
    storage: Storage,
) -> Optional[int]:
    chat = update.chat
    actor = update.from_user

    try:
        administrators = await context.bot.get_chat_administrators(chat.id)
    except TelegramError:
        logger.exception("Cannot read administrators for chat %s", chat.id)
        administrators = []

    for administrator in administrators:
        if administrator.status == "creator" and storage.owner_exists(administrator.user.id):
            return administrator.user.id

    if actor is not None and storage.owner_exists(actor.id):
        return actor.id

    return None


async def on_my_chat_member(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    membership = update.my_chat_member
    if membership is None or membership.chat.type != Chat.CHANNEL:
        return

    storage = get_storage(context)
    chat = membership.chat
    new_status = membership.new_chat_member.status
    old_status = membership.old_chat_member.status

    if new_status == "administrator":
        owner_user_id = await resolve_owner_user_id(membership, context, storage)

        if owner_user_id is None:
            logger.warning(
                "Channel %s was not bound because owner/actor is not registered.",
                chat.id,
            )
            return

        storage.bind_channel(chat, owner_user_id, new_status)
        await send_owner_message(
            context,
            owner_user_id,
            "Канал привязан.\n"
            f"Канал: <b>{escape(chat_label(chat))}</b>\n"
            f"Статус бота: <b>{escape(new_status)}</b>\n"
            f"Время: <b>{escape(format_local_time(utc_now()))}</b>",
        )
        return

    if new_status == "member":
        owner_user_id = storage.unbind_channel(chat.id)
        if owner_user_id is None:
            owner_user_id = await resolve_owner_user_id(membership, context, storage)

        if owner_user_id is not None:
            await send_owner_message(
                context,
                owner_user_id,
                "Мне нужны права администратора, чтобы отслеживать подписки.\n"
                f"Канал: <b>{escape(chat_label(chat))}</b>\n"
                f"Текущий статус: <b>{escape(new_status)}</b>",
            )
        return

    if old_status in {"administrator", "member"} and new_status in INACTIVE_STATUSES:
        owner_user_id = storage.unbind_channel(chat.id)
        if owner_user_id is not None:
            await send_owner_message(
                context,
                owner_user_id,
                "Канал отвязан.\n"
                f"Канал: <b>{escape(chat_label(chat))}</b>\n"
                f"Время: <b>{escape(format_local_time(utc_now()))}</b>",
            )


async def on_chat_member(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    membership = update.chat_member
    if membership is None or membership.chat.type != Chat.CHANNEL:
        return

    old_member = membership.old_chat_member
    new_member = membership.new_chat_member
    user = new_member.user

    if user.is_bot:
        return

    was_active = is_active_member(old_member)
    is_active = is_active_member(new_member)

    if not was_active and is_active:
        event_type = "subscribe"
        event_title = "Новая подписка"
    elif was_active and not is_active:
        event_type = "unsubscribe"
        event_title = "Отписка"
    else:
        return

    storage = get_storage(context)
    owner_user_id = storage.get_channel_owner(membership.chat.id)
    if owner_user_id is None:
        return

    event_time = utc_now()
    actor_user_id = membership.from_user.id if membership.from_user else None
    storage.record_event(
        chat_id=membership.chat.id,
        user=user,
        event_type=event_type,
        old_status=old_member.status,
        new_status=new_member.status,
        event_time=event_time,
        actor_user_id=actor_user_id,
    )

    await send_owner_message(
        context,
        owner_user_id,
        f"<b>{escape(event_title)}</b>\n"
        f"Канал: <b>{escape(chat_label(membership.chat))}</b>\n"
        f"Пользователь: <b>{escape(user_label(user))}</b>\n"
        f"Время: <b>{escape(format_local_time(event_time))}</b>",
    )


def main() -> None:
    logging.basicConfig(
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
        level=logging.INFO,
    )

    storage = Storage(DB_PATH)
    application = Application.builder().token(BOT_TOKEN).build()
    application.bot_data["storage"] = storage

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("channels", channels_command))
    application.add_handler(
        ChatMemberHandler(on_my_chat_member, ChatMemberHandler.MY_CHAT_MEMBER)
    )
    application.add_handler(ChatMemberHandler(on_chat_member, ChatMemberHandler.CHAT_MEMBER))

    logger.info("Channel subscriptions bot started")
    application.run_polling(
        allowed_updates=["message", "my_chat_member", "chat_member"],
        drop_pending_updates=False,
    )


if __name__ == "__main__":
    main()
