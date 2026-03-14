import type { User } from '../types/user';
import { BASE_URL } from './baseUrl';

/** Backend UserDto (camelCase) */
interface UserDto {
  id: number;
  username: string;
  phone: string;
  email: string | null;
  address: string | null;
  registeredAt: string;
}

function toUser(d: UserDto): User {
  return {
    id: d.id,
    username: d.username,
    phone: d.phone,
    email: d.email ?? null,
    address: d.address ?? null,
    registered_at: d.registeredAt,
  };
}

export async function fetchUser(id: number): Promise<User | null> {
  const resp = await fetch(`${BASE_URL}/users/${id}`);
  if (!resp.ok) {
    if (resp.status === 404) return null;
    throw new Error(`Failed to fetch user: ${resp.status}`);
  }
  const d = (await resp.json()) as UserDto;
  return toUser(d);
}

export async function createUser(data: { username: string; phone: string }): Promise<User> {
  const resp = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: data.username,
      phone: data.phone,
      email: null,
      address: null,
    }),
  });
  if (!resp.ok) throw new Error(`Failed to create user: ${resp.status}`);
  const d = (await resp.json()) as UserDto;
  return toUser(d);
}
