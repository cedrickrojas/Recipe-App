import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DiscoverPage } from './discover.page';

describe('DiscoverPage', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [DiscoverPage],
      providers: [provideRouter([]), { provide: AuthService, useValue: { user$: of({ uid: 'test-cook' }) } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(DiscoverPage);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('shows the matching ingredients and cooking instructions as a dish is searched', async () => {
    const fixture = await setup();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector<HTMLInputElement>('#dish-search')!;
    input.value = 'adobong manok';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelectorAll('.recipe-result')).toHaveLength(1);
    expect(element.querySelector('#dish-heading')?.textContent).toBe('Chicken Adobo');
    expect(element.querySelector('.ingredients')?.textContent).toContain('1 kg chicken');
    expect(element.querySelector('.instructions ol li')?.textContent).toContain('Combine the chicken');
  });

  it('clears ingredient checkmarks when the selected recipe changes', async () => {
    const fixture = await setup();
    const element: HTMLElement = fixture.nativeElement;
    fixture.componentInstance.query.set('adobo');
    fixture.detectChanges();
    await fixture.whenStable();
    element.querySelector<HTMLInputElement>('.ingredients input')!.click();
    fixture.detectChanges();
    expect(element.querySelector<HTMLInputElement>('.ingredients input')!.checked).toBe(true);
    element.querySelectorAll<HTMLButtonElement>('.recipe-result')[1].click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelector('#dish-heading')?.textContent).toBe('Pork Adobo');
    expect(Array.from(element.querySelectorAll<HTMLInputElement>('.ingredients input')).every((input) => !input.checked)).toBe(true);
  });

  it('hides stale recipe details for an unmatched search and lets the user reset', async () => {
    const fixture = await setup();
    const element: HTMLElement = fixture.nativeElement;
    fixture.componentInstance.query.set('unlisted dish');
    fixture.detectChanges();
    expect(element.querySelector('app-cooking-guide')).toBeNull();
    expect(element.querySelector('.no-recipes')).not.toBeNull();
    element.querySelector<HTMLButtonElement>('.no-recipes button')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelectorAll('.recipe-result')).toHaveLength(30);
    expect(element.querySelector('app-cooking-guide')).not.toBeNull();
  });

  it('shows ten choices when a recipe category is selected', async () => {
    const fixture = await setup();
    const element: HTMLElement = fixture.nativeElement;
    for (const category of ['Dinner', 'Lunch', 'Breakfast']) {
      const button = Array.from(element.querySelectorAll<HTMLButtonElement>('.finder-categories button'))
        .find((item) => item.textContent?.trim() === category)!;
      button.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(element.querySelectorAll('.recipe-result')).toHaveLength(10);
      expect(element.querySelector('[role="status"]')?.textContent).toContain('10 recipes found');
    }
  });
});
