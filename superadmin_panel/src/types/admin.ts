export interface AdminRestaurantOverview {
  id: number;
  name: string;
  address: string;
  staff: { id: number; userId: number; restaurantId: number; permission: string }[];
  meals: { id: number; restaurantId: number; name: string; price: number; available: boolean }[];
  orderHistory: { id: number; status: string; total: number; createdAt: string }[];
}

export interface AdminUserOverview {
  id: number;
  username: string;
  phone: string;
  email: string | null;
  address: string | null;
  courier: boolean;
  staffAssignments: { restaurantId: number; restaurantName: string; permission: string }[];
  orderHistory: { orderId: number; restaurantName: string; total: number; createdAt: string }[];
}

export interface CreateRestaurantRequest {
  name: string;
  address: string;
  adminUserId: number;
}
