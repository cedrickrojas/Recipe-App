import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { LandingHeroComponent } from './landing-hero.component';
import { LandingCollectionComponent } from './landing-collection.component';
import { SampleRecipe } from './sample-recipe.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  imports: [RouterLink, IonContent, LandingHeroComponent, LandingCollectionComponent],
})
export class LandingPage {
  @ViewChild('recipeDialog') private recipeDialog?: ElementRef<HTMLDialogElement>;

  readonly menuOpen = signal(false);
  readonly selectedRecipe = signal<SampleRecipe | null>(null);
  readonly recipes: SampleRecipe[] = [
    {
      name: 'Slow Sunday pancakes', category: 'Breakfast', time: 20, image: 'pancakes',
      description: 'Fluffy, golden, and made for a morning with nowhere to rush.',
      ingredients: ['1 cup all-purpose flour', '1 tablespoon sugar', '2 teaspoons baking powder', '¾ cup milk', '1 egg', '2 tablespoons melted butter', 'Berries and maple syrup, to serve'],
      steps: ['Mix the flour, sugar, and baking powder in a bowl.', 'Whisk the milk, egg, and butter separately, then gently stir into the dry ingredients.', 'Pour small rounds onto a lightly buttered pan over medium heat. Flip when bubbles appear and cook until golden.', 'Serve warm with berries and a drizzle of maple syrup.'],
    },
    {
      name: 'A bowl full of goodness', category: 'Lunch', time: 15, image: 'salad',
      description: 'Fresh greens, crunchy vegetables, and a bright lemon dressing.',
      ingredients: ['3 cups mixed greens', '1 cup chopped seasonal vegetables', '½ cup cooked chickpeas', '2 tablespoons olive oil', '1 tablespoon lemon juice', 'Salt and pepper, to taste'],
      steps: ['Wash and dry the greens, then chop your vegetables.', 'Whisk olive oil and lemon juice with a pinch of salt and pepper.', 'Toss the greens, vegetables, and chickpeas with the dressing just before serving.'],
    },
    {
      name: 'Weeknight pesto pasta', category: 'Dinner', time: 25, image: 'pasta',
      description: 'Your answer to “what’s for dinner?” A little basil goes a long way.',
      ingredients: ['200 g pasta', '3 tablespoons basil pesto', '1 cup cherry tomatoes, halved', '2 tablespoons grated Parmesan', 'Salt and pepper, to taste'],
      steps: ['Cook the pasta in salted water according to the package instructions. Reserve ½ cup of cooking water before draining.', 'Toss the warm pasta with pesto, tomatoes, and a splash of the reserved water.', 'Finish with Parmesan and black pepper. Add more pasta water if needed.'],
    },
    {
      name: 'Just-one-more cookies', category: 'Dessert', time: 30, image: 'cookies',
      description: 'Crisp edges, soft centers, and plenty of chocolate. Save a few for later.',
      ingredients: ['½ cup softened butter', '¾ cup brown sugar', '1 egg', '1 teaspoon vanilla', '1¼ cups all-purpose flour', '½ teaspoon baking soda', '¾ cup chocolate chips'],
      steps: ['Heat the oven to 175°C and line a baking tray.', 'Cream the butter and sugar, then mix in the egg and vanilla.', 'Stir in the flour and baking soda, then fold in chocolate chips.', 'Scoop onto the tray, leaving space between cookies. Bake for 10–12 minutes until the edges are golden. Cool on the tray.'],
    },
  ];


  scrollTo(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  openRecipe(recipe: SampleRecipe): void {
    this.selectedRecipe.set(recipe);
    this.recipeDialog?.nativeElement.showModal();
  }

  closeRecipe(): void {
    this.recipeDialog?.nativeElement.close();
  }
}
