import { BASE_URL } from "./baseUrl";
import { AdminRestaurant } from "../types/adminRestaurant";

export async function fetchAdminRestaurants(): Promise<AdminRestaurant[]> {
  const resp = await fetch(`${BASE_URL}/api/admin/restaurants`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch admin restaurants: ${resp.status}`);
  }
  return (await resp.json()) as AdminRestaurant[];
}

