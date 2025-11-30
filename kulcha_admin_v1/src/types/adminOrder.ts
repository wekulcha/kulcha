export type AdminOrderStatusCode =
  | "PENDING"
  | "COOKING"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminOrderItem {
  meal_id: number;
  name: string;
  quantity: number;
}

export interface AdminOrder {
  id: number;
  status: AdminOrderStatusCode;
  created_at: string;
  total: number;
  service_type: "DELIVERY" | "DINE_IN";
  delivery_address: string | null;
  username: string | null;
  phone: string;
  items: AdminOrderItem[];
}

