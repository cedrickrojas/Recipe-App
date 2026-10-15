import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../app.routes';
import { AuthService } from '../services/auth.service';
import { FinderHeaderComponent } from '../pages/discover/finder-header.component';

describe('Landing page and protected Recipe Finder', () => {
  function setup(signedIn = false) {
    const user$ = new BehaviorSubject<{ uid: string } | null>(signedIn ? { uid: 'test-cook' } : null);
    const auth = {
      user$,
      logout: vi.fn(async () => { user$.next(null); }),
      friendlyErrorMessage: vi.fn().mockReturnValue('Please try again.'),
    };
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: AuthService, useValue: auth }, { provide: ToastController, useValue: {} }],
    });
    return { auth };
  }

  it('shows only the landing page and account links to a signed-out visitor', async () => {
    setup();
    const harness = await RouterTestingHarness.create('/');
    expect(harness.routeNativeElement?.querySelector('#hero-heading')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('nav a[href="/login"]')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('nav a[href="/register"]')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('#dish-search')).toBeNull();
    expect(harness.routeNativeElement?.querySelector('.recipe-list')).toBeNull();
  });

  it('sends direct signed-out requests for the finder to login without showing recipes', async () => {
    setup();
    const harness = await RouterTestingHarness.create('/finder');
    expect(TestBed.inject(Router).url).toBe('/login');
    expect(harness.routeNativeElement?.querySelector('form')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('#dish-search')).toBeNull();
  });

  it('opens the finder for an existing session and returns to the landing page on logout', async () => {
    const { auth } = setup(true);
    const harness = await RouterTestingHarness.create('/');
    expect(TestBed.inject(Router).url).toBe('/finder');
    expect(harness.routeNativeElement?.querySelector('#dish-search')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelectorAll('.recipe-result')).toHaveLength(30);
    const header = harness.fixture.debugElement.query(By.directive(FinderHeaderComponent)).componentInstance as FinderHeaderComponent;
    await header.logout();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(auth.logout).toHaveBeenCalledOnce();
    expect(TestBed.inject(Router).url).toBe('/');
    expect(harness.routeNativeElement?.querySelector('#hero-heading')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('#dish-search')).toBeNull();
  });
});
