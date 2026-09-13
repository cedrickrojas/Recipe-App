import { Component, computed, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonSpinner,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';

import { RecipeService } from '../../services/recipe.service';
import { Recipe, RECIPE_CATEGORIES } from '../../models/recipe.model';
import { atLeastOneIngredientValidator, parseIngredients } from '../../utils/recipe-form.util';

type LoadState =
  | { status: 'loading'; recipe: Recipe | undefined }
  | { status: 'not-found'; recipe: undefined }
  | { status: 'loaded'; recipe: Recipe }
  | { status: 'error'; recipe: undefined };

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class EditRecipePage {
  /** Bound automatically from the :id route param (withComponentInputBinding). */
  id = input<string>('');

  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  readonly categories = RECIPE_CATEGORIES;
  isSubmitting = false;
  private formPopulated = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required]],
    ingredients: ['', [Validators.required, atLeastOneIngredientValidator]],
    instructions: ['', [Validators.required]],
    preparationTime: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  private state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        id
          ? this.recipeService.getRecipe(id).pipe(
              map((recipe): LoadState =>
                recipe ? { status: 'loaded', recipe } : { status: 'not-found', recipe: undefined }
              ),
              startWith<LoadState>({ status: 'loading', recipe: undefined }),
              catchError(() => of<LoadState>({ status: 'error', recipe: undefined }))
            )
          : of<LoadState>({ status: 'not-found', recipe: undefined })
      )
    ),
    { initialValue: { status: 'loading', recipe: undefined } as LoadState }
  );

  isLoading = computed(() => this.state().status === 'loading');
  hasError = computed(() => this.state().status === 'error');
  notFound = computed(() => this.state().status === 'not-found');
  isReady = computed(() => this.state().status === 'loaded');

  get name() {
    return this.form.controls.name;
  }
  get category() {
    return this.form.controls.category;
  }
  get ingredients() {
    return this.form.controls.ingredients;
  }
  get instructions() {
    return this.form.controls.instructions;
  }
  get preparationTime() {
    return this.form.controls.preparationTime;
  }

  constructor() {
    addIcons({ 'time-outline': timeOutline });

    // Populate the form once, the first time the recipe finishes loading —
    // never again afterward, so we don't clobber the user's in-progress edits
    // if the live Firestore stream emits again while they're typing.
    effect(() => {
      const current = this.state();
      if (current.status === 'loaded' && !this.formPopulated) {
        this.formPopulated = true;
        this.form.setValue({
          name: current.recipe.name,
          category: current.recipe.category,
          ingredients: current.recipe.ingredients.join('\n'),
          instructions: current.recipe.instructions,
          preparationTime: current.recipe.preparationTime,
        });
      }
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const recipeId = this.id();
    if (!recipeId) {
      return;
    }

    this.isSubmitting = true;
    const value = this.form.getRawValue();

    try {
      await this.recipeService.updateRecipe(recipeId, {
        name: value.name.trim(),
        category: value.category,
        ingredients: parseIngredients(value.ingredients),
        instructions: value.instructions.trim(),
        preparationTime: Number(value.preparationTime),
      });

      await this.showToast('♡ Recipe updated successfully!', 'medium');
      this.router.navigate(['/recipe', recipeId]);
    } catch (error) {
      await this.showToast(this.recipeService.friendlyErrorMessage(error), 'danger');
    } finally {
      this.isSubmitting = false;
    }
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
