import { Component, computed, inject, signal } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RecipeCatalogService } from '../../services/recipe-catalog.service';
import { CookingGuideComponent } from './cooking-guide.component';
import { RecipeSearchComponent } from './recipe-search.component';
import { CatalogRecipe } from '../../models/catalog-recipe.model';
import { FinderHeaderComponent } from './finder-header.component';

@Component({
  selector: 'app-discover',
  imports: [IonContent, CookingGuideComponent, RecipeSearchComponent, FinderHeaderComponent],
  templateUrl: './discover.page.html',
  styleUrl: './discover.page.scss',
})
export class DiscoverPage {
  private readonly catalog = inject(RecipeCatalogService);
  readonly query = signal('');
  readonly category = signal('All');
  readonly selectedId = signal<string | null>(null);
  readonly categories = this.catalog.categories;
  readonly recipeCount = this.catalog.recipes.length;
  readonly results = computed(() => this.catalog.search(this.query(), this.category()));
  readonly selectedRecipe = computed<CatalogRecipe | null>(() => {
    const matches = this.results();
    return matches.find((recipe) => recipe.id === this.selectedId()) ?? matches[0] ?? null;
  });

  searchFor(query: string): void {
    this.query.set(query);
    this.category.set('All');
    this.selectedId.set(null);
    this.scrollTo('recipe-results');
  }

  submitSearch(): void {
    this.scrollTo(this.results().length === 1 ? 'cooking-details' : 'recipe-results');
  }

  selectRecipe(id: string): void {
    this.selectedId.set(id);
    if (window.matchMedia('(max-width: 760px)').matches) this.scrollTo('cooking-details');
  }

  clearSearch(): void {
    this.query.set('');
    this.category.set('All');
    this.selectedId.set(null);
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    element?.focus({ preventScroll: true });
  }
}
