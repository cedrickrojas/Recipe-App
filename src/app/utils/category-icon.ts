/** Decorative emoji shown on a recipe card/details page, based on its category. */
const CATEGORY_ICONS: Record<string, string> = {
  Breakfast: '🍳',
  Lunch: '🥗',
  Dinner: '🍝',
  Dessert: '🍰',
  Snack: '🧁',
  Appetizer: '🥟',
  Beverage: '🍹',
  Other: '🍽️',
};

export function getCategoryIcon(category: string | undefined): string {
  return CATEGORY_ICONS[category ?? ''] ?? '🍓';
}
