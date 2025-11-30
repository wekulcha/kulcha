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
  delivery_address: string | null; // e.g. "1-12-34" or null for DINE_IN
  username: string | null;
  phone: string;
  payment_method: PaymentMethod;
  items: OrderItemPayload[];
  items_total: number;
  delivery_fee: number;
  service_fee: number;
  total: number;
}

export interface OrderResponse {
  id: number;
  total: number;
  created_at: string;
}

