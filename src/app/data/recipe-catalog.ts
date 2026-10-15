import { CatalogRecipe } from '../models/catalog-recipe.model';
import { RECIPE_PHOTOS } from './recipe-photos';
import { ADDITIONAL_RECIPES } from './additional-recipes';

/** Starter recipes written for the app. Times are estimates, including cooking. */
export const RECIPE_CATALOG: CatalogRecipe[] = [
  {
    id: 'chicken-adobo', name: 'Chicken Adobo', category: 'Dinner', photo: RECIPE_PHOTOS['chicken-adobo'],
    description: 'A classic soy-and-vinegar chicken dish, best served with warm rice.',
    timeMinutes: 50, servings: 4, aliases: ['adobong manok', 'chicken adobo', 'Filipino'],
    ingredients: ['1 kg chicken, cut into serving pieces', '⅓ cup soy sauce', '⅓ cup cane vinegar', '1 cup water', '6 garlic cloves, crushed', '2 dried bay leaves', '1 teaspoon whole black peppercorns', '1 tablespoon cooking oil'],
    instructions: ['Combine the chicken, soy sauce, and garlic in a bowl while you prepare the remaining ingredients.', 'Heat the oil in a pot over medium heat. Lift the chicken out of the mixture, reserving the liquid, and brown both sides.', 'Add the reserved mixture, vinegar, water, bay leaves, and peppercorns. Bring to a boil.', 'Lower the heat, cover, and simmer for 30–35 minutes, turning the chicken occasionally, until it is cooked through and tender.', 'Uncover and simmer for another 5–10 minutes to reduce the sauce. Taste and adjust with a little water if too salty. Serve with rice.'],
  },
  {
    id: 'pork-sinigang', name: 'Sinigang na Baboy', category: 'Lunch', photo: RECIPE_PHOTOS['pork-sinigang'],
    description: 'A comforting tamarind soup with tender pork and plenty of vegetables.',
    timeMinutes: 90, servings: 4, aliases: ['pork sinigang', 'sinigang na baboy', 'maasim', 'soup'],
    ingredients: ['750 g pork ribs or pork belly, cut into pieces', '6 cups water, plus more as needed', '1 onion, quartered', '2 tomatoes, quartered', '1 packet tamarind soup mix, or to taste', '1 small radish, sliced', '1 eggplant, sliced', '1 cup string beans, cut into short lengths', '2 cups kangkong leaves and tender stems', '1 long green chili (optional)', 'Fish sauce, to taste'],
    instructions: ['Place the pork, water, onion, and tomatoes in a large pot. Bring to a boil and skim off any foam.', 'Reduce the heat and simmer, partly covered, for 50–65 minutes or until the pork is tender. Add water as needed to keep the meat covered.', 'Stir in the tamarind mix gradually, tasting as you go because brands vary. Add the radish and simmer for 5 minutes.', 'Add the eggplant, string beans, and optional chili. Cook for 5–7 minutes until the vegetables are tender.', 'Add the kangkong and cook for 1–2 minutes. Season with fish sauce and serve hot.'],
  },
  {
    id: 'tinolang-manok', name: 'Tinolang Manok', category: 'Dinner', photo: RECIPE_PHOTOS['tinolang-manok'],
    description: 'A light ginger chicken soup with green papaya and leafy greens.',
    timeMinutes: 45, servings: 4, aliases: ['chicken tinola', 'tinola', 'manok', 'soup'],
    ingredients: ['750 g chicken, cut into serving pieces', '1 tablespoon cooking oil', '1 onion, sliced', '3 garlic cloves, minced', '1 thumb-sized piece ginger, sliced', '1 tablespoon fish sauce, plus more to taste', '5 cups water', '1 small green papaya or 2 chayotes, peeled and cubed', '1 cup malunggay or chili leaves'],
    instructions: ['Heat the oil in a pot. Sauté the onion, garlic, and ginger until fragrant.', 'Add the chicken and cook for 5 minutes, turning the pieces. Stir in the fish sauce.', 'Pour in the water and bring to a boil. Lower the heat, cover, and simmer for 20–25 minutes until the chicken is cooked through.', 'Add the papaya or chayote and simmer for 8–10 minutes until tender.', 'Add the leaves, cook for another minute, and adjust the seasoning before serving.'],
  },
  {
    id: 'pork-adobo', name: 'Pork Adobo', category: 'Dinner', photo: RECIPE_PHOTOS['pork-adobo'],
    description: 'Slow-simmered pork in a rich garlic, soy, and vinegar sauce.',
    timeMinutes: 75, servings: 4, aliases: ['adobong baboy', 'pork adobo', 'Filipino'],
    ingredients: ['750 g pork shoulder or belly, cubed', '⅓ cup soy sauce', '⅓ cup cane vinegar', '1½ cups water', '6 garlic cloves, crushed', '2 bay leaves', '1 teaspoon whole black peppercorns', '1 tablespoon cooking oil'],
    instructions: ['Heat the oil in a pot and brown the pork in batches over medium-high heat.', 'Return all the pork to the pot. Add the garlic and cook for 1 minute.', 'Add the soy sauce, vinegar, water, bay leaves, and peppercorns. Bring to a boil.', 'Reduce the heat, cover, and simmer for 45–60 minutes until the pork is tender, adding a little water if needed.', 'Uncover and simmer until the sauce reaches your preferred consistency. Taste, adjust with water if needed, and serve with rice.'],
  },
  {
    id: 'chicken-afritada', name: 'Chicken Afritada', category: 'Dinner', photo: RECIPE_PHOTOS['chicken-afritada'],
    description: 'Chicken, potatoes, and carrots in a hearty tomato sauce.',
    timeMinutes: 50, servings: 4, aliases: ['afritadang manok', 'chicken stew', 'afritada'],
    ingredients: ['750 g chicken, cut into serving pieces', '2 tablespoons cooking oil', '1 onion, chopped', '3 garlic cloves, minced', '1 cup tomato sauce', '1 cup water', '2 potatoes, peeled and cubed', '1 carrot, peeled and sliced', '1 red bell pepper, sliced', '1 tablespoon fish sauce', 'Salt and pepper, to taste'],
    instructions: ['Heat the oil in a pot. Sauté the onion and garlic, then add the chicken and brown lightly.', 'Stir in the fish sauce, tomato sauce, and water. Bring to a gentle boil.', 'Cover and simmer over low heat for 20 minutes.', 'Add the potatoes and carrot. Simmer for 10–15 minutes until the vegetables are tender and the chicken is cooked through.', 'Add the bell pepper and cook for 3 minutes. Season with salt and pepper and serve with rice.'],
  },
  {
    id: 'pancit-bihon', name: 'Pancit Bihon', category: 'Lunch', photo: RECIPE_PHOTOS['pancit-bihon'],
    description: 'Stir-fried rice noodles with chicken and crisp-tender vegetables.',
    timeMinutes: 35, servings: 4, aliases: ['pansit', 'rice noodles', 'bihon', 'noodles'],
    ingredients: ['200 g dry bihon rice noodles', '200 g boneless chicken, thinly sliced', '2 tablespoons cooking oil', '1 onion, sliced', '3 garlic cloves, minced', '1 carrot, cut into thin strips', '2 cups shredded cabbage', '2½ cups chicken stock, plus more if needed', '3 tablespoons soy sauce', 'Black pepper, to taste', 'Calamansi, to serve'],
    instructions: ['Soak the noodles in water according to the package directions, then drain.', 'Heat the oil in a large pan. Sauté the onion and garlic. Add the chicken and stir-fry until cooked through.', 'Add the carrot and cabbage. Stir-fry for 2–3 minutes, then transfer the chicken and vegetables to a bowl.', 'Pour the stock and soy sauce into the pan and bring to a simmer. Add the noodles and toss gently until tender and the liquid is absorbed, adding stock in small amounts if needed.', 'Return the chicken and vegetables to the pan. Toss together, season with pepper, and serve with calamansi.'],
  },
  {
    id: 'tortang-talong', name: 'Tortang Talong', category: 'Breakfast', photo: RECIPE_PHOTOS['tortang-talong'],
    description: 'Smoky eggplant dipped in egg and pan-fried until golden.',
    timeMinutes: 25, servings: 2, aliases: ['eggplant omelet', 'eggplant omelette', 'talong', 'torta'],
    ingredients: ['2 medium eggplants', '2 eggs', '¼ teaspoon salt', 'A pinch of black pepper', '2 tablespoons cooking oil', 'Rice and banana ketchup, to serve (optional)'],
    instructions: ['Grill or broil the eggplants, turning occasionally, until the skins are charred and the flesh is soft. Let them cool enough to handle.', 'Peel off the skins, keeping the stems attached. Flatten the flesh gently with a fork.', 'Beat the eggs with the salt and pepper in a shallow bowl. Dip an eggplant into the mixture.', 'Heat half the oil in a frying pan over medium heat. Add the coated eggplant and spoon a little of the remaining egg over it.', 'Cook for 2–3 minutes per side until the egg is set and golden. Repeat with the second eggplant and serve.'],
  },
  {
    id: 'ginataang-kalabasa', name: 'Ginataang Kalabasa at Sitaw', category: 'Lunch', photo: RECIPE_PHOTOS['ginataang-kalabasa'],
    description: 'Squash and string beans gently cooked in creamy coconut milk.',
    timeMinutes: 30, servings: 4, aliases: ['squash', 'coconut', 'gulay', 'vegetarian', 'kalabasa', 'sitaw'],
    ingredients: ['500 g squash, peeled and cubed', '200 g string beans, cut into short lengths', '1 can (400 ml) coconut milk', '½ cup water', '1 tablespoon cooking oil', '1 onion, chopped', '3 garlic cloves, minced', '1 thumb-sized piece ginger, sliced', 'Salt and pepper, to taste'],
    instructions: ['Heat the oil in a pot. Sauté the onion, garlic, and ginger until fragrant.', 'Add the coconut milk and water. Bring to a gentle simmer over medium-low heat.', 'Add the squash and simmer for 10–15 minutes, stirring occasionally, until almost tender.', 'Add the string beans and cook for 5–7 minutes until both vegetables are tender.', 'Season with salt and pepper. Simmer a little longer if you prefer a thicker sauce, then serve with rice.'],
  },
  {
    id: 'garlic-fried-rice', name: 'Sinangag', category: 'Breakfast', photo: RECIPE_PHOTOS['garlic-fried-rice'],
    description: 'Simple garlic fried rice for your favorite silog breakfast.',
    timeMinutes: 15, servings: 2, aliases: ['garlic fried rice', 'sinangag', 'kanin', 'silog'],
    ingredients: ['3 cups cooked rice, refrigerated promptly after cooking and kept chilled', '5 garlic cloves, finely chopped', '2 tablespoons cooking oil', '½ teaspoon salt, or to taste', 'Black pepper, to taste'],
    instructions: ['Break up any clumps in the chilled rice with a spoon.', 'Heat the oil in a large pan over medium-low heat. Add the garlic and cook until lightly golden, taking care not to burn it.', 'Add the rice and raise the heat to medium-high. Stir-fry, breaking up any remaining clumps.', 'Cook for 5–7 minutes until the rice is steaming hot throughout. Season with salt and pepper.', 'Serve immediately with your favorite breakfast sides.'],
  },
  {
    id: 'champorado', name: 'Champorado', category: 'Breakfast', photo: RECIPE_PHOTOS['champorado'],
    description: 'Warm chocolate rice porridge with a swirl of milk.',
    timeMinutes: 30, servings: 4, aliases: ['chocolate rice porridge', 'tsamporado', 'chocolate', 'merienda'],
    ingredients: ['1 cup glutinous rice, rinsed', '5 cups water, plus more as needed', '¼ cup unsweetened cocoa powder', '⅓ cup sugar, or to taste', 'A pinch of salt', 'Evaporated milk, to serve'],
    instructions: ['Combine the rice and 4½ cups of the water in a pot. Bring to a boil, then reduce the heat to a gentle simmer.', 'Cook for 15–20 minutes, stirring often, until the rice is tender. Add water if the porridge becomes too thick.', 'Mix the cocoa powder with the remaining ½ cup water until smooth, then stir it into the rice.', 'Add the sugar and salt. Simmer for 3–5 minutes, stirring, and adjust the sweetness.', 'Spoon into bowls and drizzle with evaporated milk.'],
  },
  {
    id: 'pesto-pasta', name: 'Pesto Pasta', category: 'Dinner', photo: RECIPE_PHOTOS['pesto-pasta'],
    description: 'A quick basil pesto pasta with cherry tomatoes and Parmesan.',
    timeMinutes: 25, servings: 2, aliases: ['basil pasta', 'pesto', 'Italian', 'noodles'],
    ingredients: ['200 g pasta', '3 tablespoons basil pesto', '1 cup cherry tomatoes, halved', '2 tablespoons grated Parmesan', 'Salt and black pepper, to taste'],
    instructions: ['Bring a pot of salted water to a boil. Cook the pasta according to the package directions.', 'Reserve ½ cup of the cooking water, then drain the pasta.', 'Return the warm pasta to the pot, off the heat. Toss with the pesto, tomatoes, and a splash of reserved water.', 'Add the Parmesan and black pepper. Loosen with more cooking water if needed and serve warm.'],
  },
  {
    id: 'pancakes', name: 'Fluffy Pancakes', category: 'Breakfast', photo: RECIPE_PHOTOS['pancakes'],
    description: 'Golden pancakes for slow mornings and breakfast cravings.',
    timeMinutes: 20, servings: 2, aliases: ['hotcakes', 'pancake', 'almusal'],
    ingredients: ['1 cup all-purpose flour', '1 tablespoon sugar', '2 teaspoons baking powder', '¾ cup milk', '1 egg', '2 tablespoons melted butter', 'A little oil or butter for the pan', 'Fruit and maple syrup, to serve (optional)'],
    instructions: ['Mix the flour, sugar, and baking powder in a bowl.', 'Whisk the milk, egg, and melted butter separately. Gently stir into the dry ingredients; a few small lumps are fine.', 'Warm a lightly greased pan over medium heat. Pour in small rounds of batter.', 'When bubbles appear and the edges look set, flip the pancakes. Cook the other side until golden and the center is cooked through.', 'Serve warm with fruit and syrup, if desired.'],
  },
  ...ADDITIONAL_RECIPES,
];
