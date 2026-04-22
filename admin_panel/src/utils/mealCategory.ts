/** Соответствует backend MealCategory; подписи для админки. */
export const MEAL_CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'BREAKFAST', label: 'Завтраки' },
  { value: 'SALAD', label: 'Салаты' },
  { value: 'SOUP', label: 'Супы' },
  { value: 'FIRST', label: 'Первое блюдо' },
  { value: 'SECOND', label: 'Второе блюдо' },
  { value: 'SIDE', label: 'Гарниры' },
  { value: 'SNACK', label: 'Закуски' },
  { value: 'BAKERY', label: 'Выпечка' },
  { value: 'KEBAB', label: 'Шашлыки' },
  { value: 'GRILL', label: 'Гриль' },
  { value: 'COMBO', label: 'Комбо' },
  { value: 'PLATTER', label: 'Тарелки / сборные' },
  { value: 'DESSERT', label: 'Десерты' },
  { value: 'DRINK', label: 'Напитки' },
  { value: 'SAUCE', label: 'Соусы' },
];

export function mealCategoryLabel(value: string | null | undefined): string {
  if (!value) return '';
  const o = MEAL_CATEGORY_OPTIONS.find((x) => x.value === value);
  return o?.label ?? value;
}

export function mealCategoryRank(value: string | null | undefined): number {
  if (!value) return 999;
  const index = MEAL_CATEGORY_OPTIONS.findIndex((option) => option.value === value);
  return index === -1 ? 999 : index;
}
