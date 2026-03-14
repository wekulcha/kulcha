/** From GET /users/{userId}/my-restaurants (UserRestaurantDto) */
export interface AdminRestaurant {
  id: number;
  name: string;
  address: string;
  permissions: string[];
}
