import type { Meal } from '../types/meal';
import { BASE_URL } from './baseUrl';

export async function fetchMealsByRestaurant(restaurantId: number): Promise<Meal[]> {
  const resp = await fetch(`${BASE_URL}/api/restaurants/${restaurantId}/meals`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch meals for restaurant ${restaurantId}: ${resp.status}`);
  }
  const data = (await resp.json()) as Meal[];
  return data.filter((meal) => meal.is_available !== false);
}

