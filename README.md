# My Recipe Collection ♡

*Delicious recipes, made with love.*

A feminine, elegant, pink-themed recipe journal built with **Ionic 9 + Angular 22 (standalone) + Firebase (Auth + Firestore)**. Every recipe you add is saved to your own Firestore account and only you can see it.

## Features

- Email/password sign up, sign in, sign out (Firebase Authentication)
- Create, view, edit, and delete recipes — all persisted to Cloud Firestore in real time
- Live search (by name/category) combined with category filter chips
- Reactive-form validation with friendly inline messages
- Loading, empty, and error states everywhere data is fetched
- Responsive layout: one column on mobile, 2–3 column grid on desktop
- Firestore security rules that restrict every recipe to its owner

## Tech stack

Ionic Framework 9 · Angular 22 (standalone components + signals) · TypeScript · SCSS · Firebase (Auth + Firestore, via `@angular/fire`)

## Project structure

```
src/
├── app/
│   ├── models/recipe.model.ts        # Recipe interface + category list
│   ├── services/
│   │   ├── auth.service.ts           # Firebase Authentication wrapper
│   │   └── recipe.service.ts         # All Firestore CRUD for recipes
│   ├── guards/auth.guard.ts          # Route guards (signed-in / guest-only)
│   ├── utils/                        # Small pure helpers (category icons, form parsing)
│   ├── pages/
│   │   ├── login/
│   │   ├── register/
│   │   ├── home/                     # Recipe list, search, filters
│   │   ├── add-recipe/
│   │   ├── recipe-details/
│   │   └── edit-recipe/
│   ├── app.routes.ts
│   └── app.component.ts
├── environments/
│   ├── environment.ts                # Firebase config (dev) — fill this in
│   └── environment.prod.ts           # Firebase config (prod) — fill this in
└── theme/variables.scss              # Pink color palette / design tokens

firestore.rules                        # Firestore security rules (owner-only access)
firestore.indexes.json                 # Composite index required by the recipes query
firebase.json                          # Firebase CLI project config
```

## 1. Firebase setup

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com).
2. **Register a Web App** inside that project (the `</>` icon on the project overview page). Firebase will show you a `firebaseConfig` object — keep it handy.
3. **Enable Authentication**: *Build → Authentication → Get started → Sign-in method → Email/Password → Enable*.
4. **Create a Cloud Firestore database**: *Build → Firestore Database → Create database* (start in production mode — the rules below already lock it down).
5. **Add your Firebase config** to both `src/environments/environment.ts` and `src/environments/environment.prod.ts`, replacing the placeholders:

   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     },
   };
   ```

6. **Deploy the security rules and index** (requires the [Firebase CLI](https://firebase.google.com/docs/cli)):

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add        # pick the project you just created
   firebase deploy --only firestore:rules,firestore:indexes
   ```

   Firestore also offers to create the composite index automatically the first time the app runs a query that needs it — either approach works.

## 2. Install & run

```bash
npm install
ionic serve
```

(`npm start` / `ng serve` also work.) The app opens at `http://localhost:8100`.

- **Node.js**: this project's Angular CLI version requires Node **v22.22.3+** (or v24.15+/v26+). If `ionic serve` reports an unsupported Node version, upgrade Node first.

## 3. Try it out

1. Open the app — you'll land on **Login**. Tap "Create one" to register with an email + password.
2. You're taken to **Home**, empty at first — tap the pink **+** button (or "Add Recipe") to create your first recipe.
3. Fill in the name, category, ingredients (one per line), instructions, and prep time, then **♡ Save Recipe**.
4. Back on Home, use the search bar or category chips to filter, tap a card to see full **Recipe Details**, or use the pencil/trash icons to edit or delete.
5. Sign out from the icon in the top-right corner of Home.

Everything you do here writes to your Firestore `recipes` collection — open the Firebase console's Firestore tab to watch documents appear/update/disappear live.

## Firestore data model

```typescript
// collection: recipes
{
  id: string;            // Firestore document id
  userId: string;        // owner's Firebase Auth uid
  name: string;
  category: string;
  ingredients: string[];
  instructions: string;
  preparationTime: number;
  createdAt: Timestamp;  // serverTimestamp()
  updatedAt: Timestamp;  // serverTimestamp()
}

// collection: users  (document id === the Firebase Auth uid)
{
  uid: string;
  email: string;
  createdAt: Timestamp;  // serverTimestamp(), written on registration
}
```

Every successful registration (`AuthService.register`) creates both the Firebase Auth account **and** its mirrored `users/{uid}` Firestore document in one flow — so registered users are queryable like any other data, not just entries in Firebase Authentication.

## Security rules summary

`firestore.rules` only allows a signed-in user to read, update, or delete a recipe **they own** (`resource.data.userId == request.auth.uid`), and only allows creating a recipe whose `userId` matches their own uid. It applies the same ownership check to `users/{uid}` — a user may only ever read or write their own profile document, and profile documents can't be deleted through client rules at all. Unauthenticated access is rejected entirely — there is no `allow read, write: if true` anywhere in this project.

## Building for production

```bash
ionic build --prod
```

Output is written to `www/`, ready to deploy (e.g. `firebase deploy --only hosting`, after configuring `firebase.json`'s hosting section for your project).
