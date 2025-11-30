import { BASE_URL } from "./baseUrl";
import { AdminOrder, AdminOrderStatusCode } from "../types/adminOrder";

export type AdminOrderFilterStatus =
  | "ALL"
  | AdminOrderStatusCode;

export async function fetchAdminOrders(
  restaurantId: number,
  status: AdminOrderFilterStatus = "ALL"
): Promise<AdminOrder[]> {
  const params = new URLSearchParams();
  if (status && status !== "ALL") {
    params.set("status", status);
  }

  const query = params.toString();
  const url = query
    ? `${BASE_URL}/api/admin/restaurants/${restaurantId}/orders?${query}`
    : `${BASE_URL}/api/admin/restaurants/${restaurantId}/orders`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch admin orders: ${resp.status}`);
  }
  return (await resp.json()) as AdminOrder[];
}

export async function updateAdminOrderStatus(
  orderId: number,
  status: AdminOrderStatusCode
): Promise<AdminOrder> {
  const resp = await fetch(`${BASE_URL}/api/admin/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!resp.ok) {
    throw new Error(`Failed to update order status: ${resp.status}`);
  }

  return (await resp.json()) as AdminOrder;
}

