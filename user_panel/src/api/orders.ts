import type { CreateOrderPayload, OrderResponse } from '../types/order';
import { BASE_URL } from './baseUrl';
import { buildUserApiJsonHeaders } from '../telegram/initTelegram';

/** Backend checkout body (camelCase) */
interface OrderCheckoutBody {
  restaurantId: number;
  deliveryAddress: string | null;
  orderType: 'DELIVERY' | 'DINE_IN';
  itemsTotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  items: { mealId: number; quantity: number; unitPrice: number }[];
}

export async function createOrder(
  _userId: number,
  payload: CreateOrderPayload
): Promise<OrderResponse> {
  const body: OrderCheckoutBody = {
    restaurantId: payload.restaurant_id,
    deliveryAddress: payload.delivery_address ?? null,
    orderType: payload.service_type,
    itemsTotal: payload.items_total,
    deliveryFee: payload.delivery_fee,
    serviceFee: payload.service_fee,
    total: payload.total,
    items: payload.items.map((it) => ({
      mealId: it.meal_id,
      quantity: it.quantity,
      unitPrice: it.price,
    })),
  };

  const orderResp = await fetch(`${BASE_URL}/orders/checkout`, {
    method: 'POST',
    headers: buildUserApiJsonHeaders(),
    body: JSON.stringify(body),
  });
  if (!orderResp.ok) {
    throw new Error(`Failed to create order: ${orderResp.status}`);
  }
  const order = (await orderResp.json()) as OrderResponse & { id: number; total: number; createdAt?: string };
  return {
    id: order.id,
    total: order.total,
    createdAt: order.createdAt ?? new Date().toISOString(),
  };
}
