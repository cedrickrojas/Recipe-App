import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LandingCollectionComponent } from './landing-collection.component';
import { SampleRecipe } from './sample-recipe.model';

describe('LandingCollectionComponent', () => {
  const recipes: SampleRecipe[] = [
    { name: 'Pancakes', category: 'Breakfast', time: 20, image: 'pancakes', description: '', ingredients: [], steps: [] },
    { name: 'Pasta', category: 'Dinner', time: 25, image: 'pasta', description: '', ingredients: [], steps: [] },
  ];

  async function setup() {
    await TestBed.configureTestingModule({
      imports: [LandingCollectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(LandingCollectionComponent);
    fixture.componentRef.setInput('recipes', recipes);
    fixture.detectChanges();
    return fixture;
  }

  it('filters the visible sample recipes and restores the collection', async () => {
    const fixture = await setup();
    const element: HTMLElement = fixture.nativeElement;
    const tabs = Array.from(element.querySelectorAll<HTMLButtonElement>('.category-tabs button'));
    tabs.find((tab) => tab.textContent?.trim() === 'Dinner')!.click();
    fixture.detectChanges();
    expect(element.querySelectorAll('.sample-card')).toHaveLength(1);
    expect(element.querySelector('.sample-card')?.textContent).toContain('Pasta');
    expect(tabs.find((tab) => tab.textContent?.trim() === 'Dinner')?.getAttribute('aria-pressed')).toBe('true');
    tabs[0].click();
    fixture.detectChanges();
    expect(element.querySelectorAll('.sample-card')).toHaveLength(2);
  });

  it('emits the selected recipe so the page can open its details', async () => {
    const fixture = await setup();
    const onRecipeSelected = vi.fn();
    fixture.componentInstance.recipeSelected.subscribe(onRecipeSelected);
    (fixture.nativeElement.querySelector('.sample-card') as HTMLButtonElement).click();
    expect(onRecipeSelected).toHaveBeenCalledWith(recipes[0]);
  });
});
