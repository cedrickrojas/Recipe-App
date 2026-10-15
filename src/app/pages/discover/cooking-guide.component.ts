import { Component, effect, input, output, signal } from '@angular/core';
import { CatalogRecipe } from '../../models/catalog-recipe.model';

@Component({
  selector: 'app-cooking-guide',
  templateUrl: './cooking-guide.component.html',
  styleUrl: './cooking-guide.component.scss',
})
export class CookingGuideComponent {
  readonly recipe = input.required<CatalogRecipe>();
  readonly backRequested = output<void>();
  readonly checkedIngredients = signal(new Set<number>());

  constructor() {
    effect(() => {
      this.recipe();
      this.checkedIngredients.set(new Set());
    });
  }

  toggleIngredient(index: number): void {
    this.checkedIngredients.update((current) => {
      const next = new Set(current);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }
}
