import type { CreateOrderPayload, OrderResponse } from '../types/order';
import { BASE_URL } from './baseUrl';

/** Backend OrderDto for create (camelCase) */
interface OrderDtoCreate {
  status: string;
  userId: number;
  deliveryAddress: string | null;
  restaurantId: number;
  orderType: 'DELIVERY' | 'DINE_IN';
  itemsTotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

/** Backend OrderPositionDto for create */
interface OrderPositionDtoCreate {
  mealId: number;
  orderId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export async function createOrder(
  userId: number,
  payload: CreateOrderPayload
): Promise<OrderResponse> {
  const orderBody: OrderDtoCreate = {
    status: 'CREATED',
    userId,
    deliveryAddress: payload.delivery_address ?? null,
    restaurantId: payload.restaurant_id,
    orderType: payload.service_type,
    itemsTotal: payload.items_total,
    deliveryFee: payload.delivery_fee,
    serviceFee: payload.service_fee,
    total: payload.total,
  };

  const orderResp = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderBody),
  });
  if (!orderResp.ok) {
    throw new Error(`Failed to create order: ${orderResp.status}`);
  }
  const order = (await orderResp.json()) as OrderResponse & { id: number };

  for (const item of payload.items) {
    const posBody: OrderPositionDtoCreate = {
      orderId: order.id,
      mealId: item.meal_id,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
    };
    const posResp = await fetch(`${BASE_URL}/order-positions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posBody),
    });
    if (!posResp.ok) {
      throw new Error(`Failed to create order position: ${posResp.status}`);
    }
  }

  return { id: order.id, total: order.total, createdAt: order.createdAt ?? new Date().toISOString() };
}
