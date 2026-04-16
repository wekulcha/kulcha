import type { AdminRestaurantOverview, AdminUserOverview, CreateRestaurantRequest } from "../types/admin";
import { apiFetchJson } from "./client";

export async function fetchAdminRestaurants(): Promise<AdminRestaurantOverview[]> {
  return apiFetchJson<AdminRestaurantOverview[]>("/admin/restaurants", {}, { auth: true });
}

export async function createRestaurant(body: CreateRestaurantRequest): Promise<{ id: number; name: string; address: string }> {
  return apiFetchJson<{ id: number; name: string; address: string }>(
    "/admin/restaurants",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    { auth: true }
  );
}

export async function fetchAdminUsers(): Promise<AdminUserOverview[]> {
  return apiFetchJson<AdminUserOverview[]>("/admin/users", {}, { auth: true });
}

export async function fetchOrders(): Promise<unknown[]> {
  return apiFetchJson<unknown[]>("/orders", {}, { auth: true });
}
