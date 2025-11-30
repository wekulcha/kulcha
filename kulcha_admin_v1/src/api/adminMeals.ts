import { BASE_URL } from "./baseUrl";
import { Meal } from "../types/adminMeal";
import { AdminMealCreate } from "../types/adminMeal";

export async function createAdminMeal(
  restaurantId: number,
  payload: AdminMealCreate
): Promise<Meal> {
  const resp = await fetch(
    `${BASE_URL}/api/admin/restaurants/${restaurantId}/meals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!resp.ok) {
    throw new Error(`Failed to create meal: ${resp.status}`);
  }

  return (await resp.json()) as Meal;
}

export async function fetchAdminMeals(
  restaurantId: number
): Promise<Meal[]> {
  const resp = await fetch(
    `${BASE_URL}/api/admin/restaurants/${restaurantId}/meals`
  );
  if (!resp.ok) {
    throw new Error(`Failed to fetch meals: ${resp.status}`);
  }
  return (await resp.json()) as Meal[];
}

export async function updateMealAvailability(
  mealId: number,
  isAvailable: boolean
): Promise<Meal> {
  const resp = await fetch(`${BASE_URL}/api/admin/meals/${mealId}/availability`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_available: isAvailable }),
  });

  if (!resp.ok) {
    throw new Error(`Failed to update meal availability: ${resp.status}`);
  }

  return (await resp.json()) as Meal;
}

