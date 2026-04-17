import type { Restaurant } from '../types/restaurant';
import { BASE_URL } from './baseUrl';

interface RestaurantDto {
  id: number;
  name: string;
  address: string;
  imageLink?: string | null;
}

function mapRestaurant(d: RestaurantDto): Restaurant {
  return {
    id: d.id,
    name: d.name,
    address: d.address,
    imageLink: d.imageLink ?? null,
  };
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const resp = await fetch(`${BASE_URL}/restaurants`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch restaurants: ${resp.status}`);
  }
  const raw = (await resp.json()) as RestaurantDto[];
  return raw.map(mapRestaurant);
}


