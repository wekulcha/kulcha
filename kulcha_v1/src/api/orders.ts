import type { CreateOrderPayload, OrderResponse } from '../types/order';
import { BASE_URL } from './baseUrl';

export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  const resp = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(`Failed to create order: ${resp.status}`);
  }

  return (await resp.json()) as OrderResponse;
}

