import { BASE_URL } from "./baseUrl";
import type { AdminRestaurantOverview, AdminUserOverview, CreateRestaurantRequest } from "../types/admin";

export async function fetchAdminRestaurants(): Promise<AdminRestaurantOverview[]> {
  const resp = await fetch(`${BASE_URL}/admin/restaurants`);
  if (!resp.ok) throw new Error(`Ошибка загрузки ресторанов: ${resp.status}`);
  return resp.json();
}

export async function createRestaurant(body: CreateRestaurantRequest): Promise<{ id: number; name: string; address: string }> {
  const resp = await fetch(`${BASE_URL}/admin/restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error(`Ошибка создания ресторана: ${resp.status}`);
  return resp.json();
}

export async function fetchAdminUsers(): Promise<AdminUserOverview[]> {
  const resp = await fetch(`${BASE_URL}/admin/users`);
  if (!resp.ok) throw new Error(`Ошибка загрузки пользователей: ${resp.status}`);
  return resp.json();
}

export async function fetchOrders(): Promise<unknown[]> {
  const resp = await fetch(`${BASE_URL}/orders`);
  if (!resp.ok) throw new Error(`Ошибка загрузки заказов: ${resp.status}`);
  return resp.json();
}
