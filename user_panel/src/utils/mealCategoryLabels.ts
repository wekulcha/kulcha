/** Подписи категорий меню (ключ — значение enum MealCategory). */
export const MEAL_CATEGORY_LABELS: Record<string, string> = {
  BREAKFAST: 'Завтраки',
  SALAD: 'Салаты',
  SOUP: 'Супы',
  FIRST: 'Первое',
  SECOND: 'Второе',
  SIDE: 'Гарниры',
  SNACK: 'Закуски',
  BAKERY: 'Выпечка',
  KEBAB: 'Шашлыки',
  GRILL: 'Гриль',
  COMBO: 'Комбо',
  PLATTER: 'Тарелки',
  DESSERT: 'Десерты',
  DRINK: 'Напитки',
  SAUCE: 'Соусы',
};

export const MEAL_CATEGORY_ORDER: string[] = [
  'BREAKFAST',
  'SALAD',
  'SOUP',
  'FIRST',
  'SECOND',
  'SIDE',
  'SNACK',
  'BAKERY',
  'KEBAB',
  'GRILL',
  'COMBO',
  'PLATTER',
  'DESSERT',
  'DRINK',
  'SAUCE',
];

export function mealCategoryLabel(cat: string | null | undefined): string {
  if (!cat) return 'Другое';
  return MEAL_CATEGORY_LABELS[cat] ?? cat;
}

export function mealCategoryRank(cat: string | null | undefined): number {
  if (!cat) return 999;
  const index = MEAL_CATEGORY_ORDER.indexOf(cat);
  return index === -1 ? 999 : index;
}
