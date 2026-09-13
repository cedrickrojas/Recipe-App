import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonChip,
  IonFab,
  IonFabButton,
  IonSpinner,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  search,
  add,
  createOutline,
  trashOutline,
  timeOutline,
  logOutOutline,
} from 'ionicons/icons';

import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Recipe, RECIPE_CATEGORIES } from '../../models/recipe.model';
import { getCategoryIcon } from '../../utils/category-icon';

type RecipesState =
  | { status: 'loading'; recipes: Recipe[] }
  | { status: 'loaded'; recipes: Recipe[] }
  | { status: 'error'; recipes: Recipe[] };

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonIcon,
    IonButton,
    IonSearchbar,
    IonChip,
    IonFab,
    IonFabButton,
    IonSpinner,
  ],
})
export class HomePage {
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  readonly categories = ['All', ...RECIPE_CATEGORIES];
  readonly getCategoryIcon = getCategoryIcon;

  searchTerm = signal('');
  selectedCategory = signal('All');

  private recipesState = toSignal(
    this.recipeService.getRecipes().pipe(
      map((recipes): RecipesState => ({ status: 'loaded', recipes })),
      startWith<RecipesState>({ status: 'loading', recipes: [] }),
      catchError(() => of<RecipesState>({ status: 'error', recipes: [] }))
    ),
    { initialValue: { status: 'loading', recipes: [] } as RecipesState }
  );

  isLoading = computed(() => this.recipesState().status === 'loading');
  hasError = computed(() => this.recipesState().status === 'error');
  allRecipes = computed(() => this.recipesState().recipes);

  filteredRecipes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.allRecipes().filter((recipe) => {
      const matchesCategory = category === 'All' || recipe.category === category;
      const matchesSearch =
        term.length === 0 ||
        recipe.name.toLowerCase().includes(term) ||
        recipe.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  hasAnyRecipes = computed(() => this.allRecipes().length > 0);

  constructor() {
    addIcons({
      heart,
      'heart-outline': heartOutline,
      search,
      add,
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'time-outline': timeOutline,
      'log-out-outline': logOutOutline,
    });
  }

  onSearchChange(value: string | null | undefined): void {
    this.searchTerm.set(value ?? '');
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  ingredientsPreview(recipe: Recipe): string {
    return (recipe.ingredients ?? []).slice(0, 3).join(' • ');
  }

  editRecipe(event: Event, id: string | undefined): void {
    event.stopPropagation();
    if (id) {
      this.router.navigate(['/edit-recipe', id]);
    }
  }

  async deleteRecipe(event: Event, recipe: Recipe): Promise<void> {
    event.stopPropagation();
    if (!recipe.id) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Delete this recipe?',
      message: 'Are you sure you want to remove this recipe from your collection?',
      cssClass: 'pink-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.confirmDelete(recipe.id!),
        },
      ],
    });

    await alert.present();
  }

  private async confirmDelete(id: string): Promise<void> {
    try {
      await this.recipeService.deleteRecipe(id);
      await this.showToast('♡ Recipe removed from your collection.', 'medium');
    } catch (error) {
      await this.showToast(this.recipeService.friendlyErrorMessage(error), 'danger');
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  private async showToast(message: string, color: 'medium' | 'danger'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2400,
      position: 'top',
      color,
    });
    await toast.present();
  }
}
