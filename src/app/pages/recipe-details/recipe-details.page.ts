import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonContent,
  IonSpinner,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, timeOutline, checkmarkCircle } from 'ionicons/icons';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { getCategoryIcon } from '../../utils/category-icon';

type DetailsState =
  | { status: 'loading'; recipe: Recipe | undefined }
  | { status: 'not-found'; recipe: undefined }
  | { status: 'loaded'; recipe: Recipe }
  | { status: 'error'; recipe: undefined };

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonContent,
    IonSpinner,
  ],
})
export class RecipeDetailsPage {
  /** Bound automatically from the :id route param (withComponentInputBinding). */
  id = input<string>('');

  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  readonly getCategoryIcon = getCategoryIcon;

  private state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        id
          ? this.recipeService.getRecipe(id).pipe(
              map((recipe): DetailsState =>
                recipe ? { status: 'loaded', recipe } : { status: 'not-found', recipe: undefined }
              ),
              startWith<DetailsState>({ status: 'loading', recipe: undefined }),
              catchError(() => of<DetailsState>({ status: 'error', recipe: undefined }))
            )
          : of<DetailsState>({ status: 'not-found', recipe: undefined })
      )
    ),
    { initialValue: { status: 'loading', recipe: undefined } as DetailsState }
  );

  isLoading = computed(() => this.state().status === 'loading');
  hasError = computed(() => this.state().status === 'error');
  notFound = computed(() => this.state().status === 'not-found');
  recipe = computed(() => {
    const current = this.state();
    return current.status === 'loaded' ? current.recipe : undefined;
  });

  constructor() {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'time-outline': timeOutline,
      'checkmark-circle': checkmarkCircle,
    });
  }

  instructionSteps(recipe: Recipe): string[] {
    return recipe.instructions
      .split('\n')
      .map((line) => line.replace(/^\s*\d+[.)]\s*/, '').trim())
      .filter((line) => line.length > 0);
  }

  async deleteRecipe(): Promise<void> {
    const current = this.recipe();
    if (!current?.id) {
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
          handler: () => this.confirmDelete(current.id!),
        },
      ],
    });

    await alert.present();
  }

  private async confirmDelete(id: string): Promise<void> {
    try {
      await this.recipeService.deleteRecipe(id);
      await this.showToast('♡ Recipe removed from your collection.', 'medium');
      this.router.navigateByUrl('/home');
    } catch (error) {
      await this.showToast(this.recipeService.friendlyErrorMessage(error), 'danger');
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
