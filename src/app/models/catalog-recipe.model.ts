import { RecipeCategory } from './recipe.model';

export interface RecipePhoto {
  src: string;
  thumbnail: string;
  credit?: {
    author: string;
    source: string;
    license: string;
    licenseUrl?: string;
  };
}

/** Public recipes bundled with the app; separate from a user's Firestore recipes. */
export interface CatalogRecipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  timeMinutes: number;
  servings: number;
  photo: RecipePhoto;
  aliases: string[];
  ingredients: string[];
  instructions: string[];
}
