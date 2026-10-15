import { RecipeCatalogService } from './recipe-catalog.service';

describe('RecipeCatalogService', () => {
  const service = new RecipeCatalogService();

  it('finds Filipino dish aliases regardless of case, whitespace, and punctuation', () => {
    expect(service.search('  ADOBONG   MANOK!! ').map((recipe) => recipe.id)).toEqual(['chicken-adobo']);
    expect(service.search('pork sinigang').map((recipe) => recipe.id)).toEqual(['pork-sinigang']);
  });

  it('matches all search terms across recipe names and ingredients', () => {
    expect(service.search('coconut milk').map((recipe) => recipe.id)).toEqual(['ginataang-kalabasa', 'chicken-curry']);
    expect(service.search('chicken adobo').map((recipe) => recipe.id)).toEqual(['chicken-adobo']);
  });

  it('combines category filtering with search and returns no fabricated results', () => {
    expect(service.search('pork', 'Lunch').map((recipe) => recipe.id)).toEqual(['pork-sinigang', 'lumpiang-shanghai']);
    expect(service.search('adobo', 'Breakfast')).toEqual([]);
    expect(service.search('unlisted dish')).toEqual([]);
  });

  it('provides complete cooking guides with unique IDs for the whole catalog', () => {
    expect(new Set(service.recipes.map((recipe) => recipe.id)).size).toBe(service.recipes.length);
    for (const recipe of service.recipes) {
      expect(recipe.ingredients.length).toBeGreaterThan(0);
      expect(recipe.instructions.length).toBeGreaterThan(0);
      expect(recipe.timeMinutes).toBeGreaterThan(0);
      expect(recipe.servings).toBeGreaterThan(0);
      expect(recipe.photo?.src).toBeTruthy();
      expect(recipe.photo?.thumbnail).toBeTruthy();
    }
  });

  it('provides ten distinct recipes in each visible category', () => {
    expect(service.recipes).toHaveLength(30);
    expect(service.categories).toEqual(['All', 'Dinner', 'Lunch', 'Breakfast']);
    for (const category of ['Dinner', 'Lunch', 'Breakfast']) {
      expect(service.search('', category)).toHaveLength(10);
    }
  });

  it('finds the added Filipino dish names and their alternate spellings', () => {
    expect(service.search('ginisang monggo').map((recipe) => recipe.id)).toEqual(['ginisang-munggo']);
    expect(service.search('kalderetang baka').map((recipe) => recipe.id)).toEqual(['beef-caldereta']);
    expect(service.search('chicken macaroni soup').map((recipe) => recipe.id)).toEqual(['chicken-sopas']);
  });
});
