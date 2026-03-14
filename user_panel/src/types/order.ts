import type { ServiceType } from '../context/AppContext';

export type PaymentMethod = 'CASH' | 'TRANSFER';

export interface OrderItemPayload {
  meal_id: number;
  quantity: number;
  price: number; // price per unit at time of order
}

export interface CreateOrderPayload {
  restaurant_id: number;
  service_type: ServiceType;
  delivery_address: string | null;
  username: string | null;
  phone: string;
  payment_method: PaymentMethod;
  items: OrderItemPayload[];
  items_total: number;
  delivery_fee: number;
  service_fee: number;
  total: number;
}

/** Response after creating order (backend camelCase) */
export interface OrderResponse {
  id: number;
  total: number;
  createdAt: string;
}

