import { Timestamp } from '@angular/fire/firestore';

/**
 * Mirrors each Firebase Auth account into Firestore so user data can be
 * queried/joined like any other document (e.g. later showing a display
 * name on a recipe, or letting an admin list registered users).
 * Document id === the Firebase Auth uid.
 */
export interface UserProfile {
  uid: string;
  email: string;
  createdAt?: Timestamp | ReturnType<typeof Date.now> | null;
}
