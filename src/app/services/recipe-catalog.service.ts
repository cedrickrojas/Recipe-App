import { Injectable } from '@angular/core';
import { RECIPE_CATALOG } from '../data/recipe-catalog';
import { CatalogRecipe } from '../models/catalog-recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeCatalogService {
  readonly recipes = RECIPE_CATALOG;
  readonly categories = ['All', ...new Set(this.recipes.map((recipe) => recipe.category))];

  search(query: string, category = 'All'): CatalogRecipe[] {
    const terms = this.normalize(query).split(' ').filter(Boolean);
    return this.recipes.filter((recipe) => {
      if (category !== 'All' && recipe.category !== category) return false;
      const searchable = this.normalize([
        recipe.name, recipe.description, recipe.category, ...recipe.aliases, ...recipe.ingredients,
      ].join(' '));
      return terms.every((term) => searchable.includes(term));
    });
  }

  private normalize(value: string): string {
    return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
}
