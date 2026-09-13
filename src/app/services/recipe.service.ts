import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { Recipe, RecipeInput } from '../models/recipe.model';

const RECIPES_COLLECTION = 'recipes';

/**
 * All Firestore access for recipes lives here. Components never talk to
 * Firestore directly — they call these methods and subscribe to the
 * observables they return.
 */
@Injectable({ providedIn: 'root' })
export class RecipeService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  /**
   * Live stream of the signed-in user's recipes, newest first.
   * Emits an empty array (rather than erroring) when no one is signed in.
   */
  getRecipes(): Observable<Recipe[]> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      return of([]);
    }

    const recipesRef = collection(this.firestore, RECIPES_COLLECTION);
    const recipesQuery = query(recipesRef, where('userId', '==', uid), orderBy('createdAt', 'desc'));

    return collectionData(recipesQuery, { idField: 'id' }) as Observable<Recipe[]>;
  }

  /** Live stream of a single recipe by id. */
  getRecipe(id: string): Observable<Recipe | undefined> {
    const recipeRef = doc(this.firestore, RECIPES_COLLECTION, id);
    return docData(recipeRef, { idField: 'id' }) as Observable<Recipe | undefined>;
  }

  async addRecipe(recipe: RecipeInput): Promise<string> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      throw new Error('You must be signed in to save a recipe.');
    }

    const recipesRef = collection(this.firestore, RECIPES_COLLECTION);
    const docRef = await addDoc(recipesRef, {
      ...recipe,
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  }

  async updateRecipe(id: string, recipe: RecipeInput): Promise<void> {
    const recipeRef = doc(this.firestore, RECIPES_COLLECTION, id);
    await updateDoc(recipeRef, {
      ...recipe,
      updatedAt: serverTimestamp(),
    });
  }

  async deleteRecipe(id: string): Promise<void> {
    const recipeRef = doc(this.firestore, RECIPES_COLLECTION, id);
    await deleteDoc(recipeRef);
  }

  /** Turns a raw Firestore error into a friendly, user-facing message. */
  friendlyErrorMessage(error: unknown): string {
    const code = (error as { code?: string })?.code ?? '';

    switch (code) {
      case 'permission-denied':
        return 'You don’t have permission to do that.';
      case 'unavailable':
        return 'Network error. Please check your connection and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
