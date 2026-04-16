import type { User } from '../types/user';
import { apiFetchJson } from './client';

interface UserDto {
  id: number;
  username: string;
  phone: string;
  email: string | null;
  address: string | null;
  registeredAt: string;
}

export function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    username: dto.username,
    phone: dto.phone,
    telegram_id: dto.id,
    email: dto.email ?? null,
    address: dto.address ?? null,
    registered_at: dto.registeredAt,
  };
}

export async function fetchCurrentUser(): Promise<User> {
  const dto = await apiFetchJson<UserDto>('/auth/me', {}, { auth: true });
  return toUser(dto);
}
