import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

/** Blocks access to recipe pages unless a user is signed in. */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['/login'])))
  );
};

/** Sends signed-in users from the landing and authentication pages to the finder. */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => (user ? router.createUrlTree(['/finder']) : true))
  );
};
