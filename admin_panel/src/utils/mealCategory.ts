/** Соответствует backend MealCategory; подписи для админки. */
export const MEAL_CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'FIRST', label: 'Первое блюдо' },
  { value: 'SECOND', label: 'Второе блюдо' },
  { value: 'SOUP', label: 'Супы' },
  { value: 'SALAD', label: 'Салаты' },
  { value: 'SIDE', label: 'Гарниры' },
  { value: 'BAKERY', label: 'Выпечка' },
  { value: 'KEBAB', label: 'Шашлыки' },
  { value: 'GRILL', label: 'Гриль' },
  { value: 'COMBO', label: 'Комбо' },
  { value: 'SNACK', label: 'Закуски' },
  { value: 'BREAKFAST', label: 'Завтраки' },
  { value: 'DESSERT', label: 'Десерты' },
  { value: 'DRINK', label: 'Напитки' },
  { value: 'SAUCE', label: 'Соусы' },
  { value: 'PLATTER', label: 'Тарелки / сборные' },
];

export function mealCategoryLabel(value: string | null | undefined): string {
  if (!value) return '';
  const o = MEAL_CATEGORY_OPTIONS.find((x) => x.value === value);
  return o?.label ?? value;
}
