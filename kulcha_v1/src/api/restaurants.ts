import type { Restaurant } from '../types/restaurant';
import { BASE_URL } from './baseUrl';

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const resp = await fetch(`${BASE_URL}/api/restaurants`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch restaurants: ${resp.status}`);
  }
  return await resp.json();
}


