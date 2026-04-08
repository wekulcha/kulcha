import type { User } from '../types/user';
import { BASE_URL } from './baseUrl';
import { buildUserApiJsonHeaders } from '../telegram/initTelegram';

/** Backend UserDto (camelCase) */
interface UserDto {
  id: number;
  username: string;
  phone: string;
  telegramId?: number | null;
  email: string | null;
  address: string | null;
  registeredAt: string;
}

function toUser(d: UserDto): User {
  return {
    id: d.id,
    username: d.username,
    phone: d.phone,
    telegram_id: d.telegramId ?? null,
    email: d.email ?? null,
    address: d.address ?? null,
    registered_at: d.registeredAt,
  };
}

export async function fetchUser(id: number): Promise<User | null> {
  const resp = await fetch(`${BASE_URL}/users/${id}`, {
    headers: buildUserApiJsonHeaders(),
  });
  if (!resp.ok) {
    if (resp.status === 404) return null;
    throw new Error(`Failed to fetch user: ${resp.status}`);
  }
  const d = (await resp.json()) as UserDto;
  return toUser(d);
}

