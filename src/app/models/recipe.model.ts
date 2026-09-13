import { Timestamp } from '@angular/fire/firestore';

/**
 * The categories a recipe can belong to.
 * Kept as a const array so the same list can drive both
 * the add/edit form <ion-select> and the home page filter chips.
 */
export const RECIPE_CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack',
  'Appetizer',
  'Beverage',
  'Other',
] as const;

export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number];

export interface Recipe {
  id?: string;
  userId?: string;
  name: string;
  category: string;
  ingredients: string[];
  instructions: string;
  preparationTime: number;
  createdAt?: Timestamp | ReturnType<typeof Date.now> | null;
  updatedAt?: Timestamp | ReturnType<typeof Date.now> | null;
}

/** Shape used while building the add/edit form, before Firestore metadata exists. */
export type RecipeInput = Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
