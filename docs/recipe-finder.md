# Recipe finder

The public home page (`/`) is a dedicated landing page with Log in and Sign up links. Recipe search, the recipe list, ingredients, and cooking guides appear only after authentication at `/finder`. Search a dish name, Filipino alias, or ingredient to see matching recipes. No external recipe API is required.

Successful login or signup opens `/finder`. An existing signed-in session visiting the landing, login, or signup page is redirected to `/finder`. Opening `/finder` while signed out redirects to `/login` without rendering the finder. Log out ends the session and returns to the landing page. Both authentication forms include a link back to the landing page.

The catalog contains 30 recipes: 10 Dinner, 10 Lunch, and 10 Breakfast dishes. It is assembled in `src/app/data/recipe-catalog.ts`, with further entries in `src/app/data/additional-recipes.ts`. Each entry needs a unique ID, name, category, aliases, ingredient quantities, numbered cooking instructions, estimated total time, and servings. The displayed recipe count updates from the catalog automatically.

Every catalog recipe includes a local photo and a smaller thumbnail, configured in `src/app/data/recipe-photos.ts`. Add both files under `src/assets/recipes/` when adding a dish. Preserve image attribution and license details; the cooking guide displays credits for the Wikimedia Commons photos. See [photo credits](recipe-photo-credits.md) for all sources.

Search is case-insensitive and combines all typed words with the selected category. An unmatched search displays a clear empty state. Selecting a recipe resets the ingredient checklist. On phones, selecting a result moves to the cooking guide; “Back to recipes” returns to the results.

The `/home` route remains the signed-in user's personal Firestore recipe collection. Its contents are separate from the public catalog.

Run `npm start` to preview, `npm run build` for a production build, and `npm test -- --watch=false` for tests. The `www` build output remains compatible with the existing Capacitor Android setup.
