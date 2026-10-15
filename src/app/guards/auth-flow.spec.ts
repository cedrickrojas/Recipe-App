import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, firstValueFrom, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginPage } from '../pages/login/login.page';
import { RegisterPage } from '../pages/register/register.page';
import { FinderHeaderComponent } from '../pages/discover/finder-header.component';
import { authGuard, guestGuard } from './auth.guard';

describe('Recipe Finder authentication flow', () => {
  function setup(signedIn = false) {
    const auth = {
      user$: of(signedIn ? { uid: 'test-user' } : null),
      login: vi.fn().mockResolvedValue(undefined),
      register: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn().mockResolvedValue(undefined),
      friendlyErrorMessage: vi.fn().mockReturnValue('Unable to log out. Please try again.'),
    };
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }, { provide: ToastController, useValue: {} }],
    });
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    return { auth, router, navigate };
  }

  it('returns to Recipe Finder after a successful login', async () => {
    const { auth, navigate } = setup();
    const page = TestBed.runInInjectionContext(() => new LoginPage());
    page.form.setValue({ email: 'cook@example.com', password: 'password123' });
    await page.login();
    expect(auth.login).toHaveBeenCalledWith('cook@example.com', 'password123');
    expect(navigate).toHaveBeenCalledWith('/finder');
  });

  it('returns to Recipe Finder after a successful signup', async () => {
    const { auth, navigate } = setup();
    const page = TestBed.runInInjectionContext(() => new RegisterPage());
    page.form.setValue({ email: 'cook@example.com', password: 'password123', confirmPassword: 'password123' });
    await page.register();
    expect(auth.register).toHaveBeenCalledWith('cook@example.com', 'password123');
    expect(navigate).toHaveBeenCalledWith('/finder');
  });

  it('redirects a signed-in visitor from authentication pages to Recipe Finder', async () => {
    const { router } = setup(true);
    const result = TestBed.runInInjectionContext(() => guestGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
    const destination = await firstValueFrom(result as Observable<boolean | UrlTree>);
    expect(router.serializeUrl(destination as UrlTree)).toBe('/finder');
  });

  it('blocks Recipe Finder for a signed-out visitor', async () => {
    const { router } = setup();
    const result = TestBed.runInInjectionContext(() => authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
    const destination = await firstValueFrom(result as Observable<boolean | UrlTree>);
    expect(router.serializeUrl(destination as UrlTree)).toBe('/login');
  });

  it('keeps logout errors visible and re-enables the button for another attempt', async () => {
    const { auth } = setup(true);
    auth.logout.mockRejectedValue(new Error('offline'));
    const header = TestBed.runInInjectionContext(() => new FinderHeaderComponent());
    await header.logout();
    expect(header.logoutError()).toBe('Unable to log out. Please try again.');
    expect(header.isLoggingOut()).toBe(false);
  });
});
