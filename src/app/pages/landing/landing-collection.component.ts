import { Component, computed, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SampleRecipe } from './sample-recipe.model';

@Component({
  selector: 'app-landing-collection',
  imports: [RouterLink],
  templateUrl: './landing-collection.component.html',
  styleUrl: './landing-collection.component.scss',
})
export class LandingCollectionComponent {
  readonly recipes = input.required<SampleRecipe[]>();
  readonly recipeSelected = output<SampleRecipe>();
  readonly selectedCategory = signal('All recipes');
  readonly categories = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
  readonly filteredRecipes = computed(() => this.recipes().filter(
    (recipe) => this.selectedCategory() === 'All recipes' || recipe.category === this.selectedCategory(),
  ));
}
