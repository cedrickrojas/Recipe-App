import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
import { restaurantOutline, timeOutline } from 'ionicons/icons';

import { RecipeService } from '../../services/recipe.service';
import { RECIPE_CATEGORIES } from '../../models/recipe.model';
import { atLeastOneIngredientValidator, parseIngredients } from '../../utils/recipe-form.util';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
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
export class AddRecipePage {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  readonly categories = RECIPE_CATEGORIES;
  isSubmitting = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required]],
    ingredients: ['', [Validators.required, atLeastOneIngredientValidator]],
    instructions: ['', [Validators.required]],
    preparationTime: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    addIcons({ 'restaurant-outline': restaurantOutline, 'time-outline': timeOutline });
  }

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

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const value = this.form.getRawValue();

    try {
      await this.recipeService.addRecipe({
        name: value.name.trim(),
        category: value.category,
        ingredients: parseIngredients(value.ingredients),
        instructions: value.instructions.trim(),
        preparationTime: Number(value.preparationTime),
      });

      await this.showToast('♡ Recipe saved successfully!', 'medium');
      this.router.navigateByUrl('/home');
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
