import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
    canActivate: [guestGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'add-recipe',
    loadComponent: () => import('./pages/add-recipe/add-recipe.page').then((m) => m.AddRecipePage),
    canActivate: [authGuard],
  },
  {
    path: 'recipe/:id',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then((m) => m.RecipeDetailsPage),
    canActivate: [authGuard],
  },
  {
    path: 'edit-recipe/:id',
    loadComponent: () => import('./pages/edit-recipe/edit-recipe.page').then((m) => m.EditRecipePage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
