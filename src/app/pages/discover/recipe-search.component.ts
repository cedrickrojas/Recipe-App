import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.scss',
})
export class RecipeSearchComponent {
  readonly query = input('');
  readonly recipeCount = input.required<number>();
  readonly queryChange = output<string>();
  readonly submitted = output<void>();
  readonly popularPicked = output<string>();
  readonly popularSearches = ['Adobo', 'Sinigang', 'Tinola', 'Pancit'];

  onSearchInput(event: Event): void {
    this.queryChange.emit((event.target as HTMLInputElement).value);
  }

  submitSearch(event: Event): void {
    event.preventDefault();
    this.submitted.emit();
  }
}
