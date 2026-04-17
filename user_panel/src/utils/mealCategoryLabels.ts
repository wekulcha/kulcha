/** Подписи категорий меню (ключ — значение enum MealCategory). */
export const MEAL_CATEGORY_LABELS: Record<string, string> = {
  FIRST: 'Первое',
  SECOND: 'Второе',
  SOUP: 'Супы',
  SALAD: 'Салаты',
  SIDE: 'Гарниры',
  BAKERY: 'Выпечка',
  KEBAB: 'Шашлыки',
  GRILL: 'Гриль',
  COMBO: 'Комбо',
  SNACK: 'Закуски',
  BREAKFAST: 'Завтраки',
  DESSERT: 'Десерты',
  DRINK: 'Напитки',
  SAUCE: 'Соусы',
  PLATTER: 'Тарелки',
};

export function mealCategoryLabel(cat: string | null | undefined): string {
  if (!cat) return 'Другое';
  return MEAL_CATEGORY_LABELS[cat] ?? cat;
}
