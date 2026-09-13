import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const USERS_COLLECTION = 'users';

/**
 * Thin wrapper around Firebase Authentication (email/password).
 * Keeps every AngularFire auth call in one place so pages never
 * talk to the Auth SDK directly.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  /** Emits the current Firebase user (or null) whenever auth state changes. */
  readonly user$: Observable<User | null> = authState(this.auth);

  get currentUserId(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }

  async register(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.ensureUserProfile(credential.user.uid, credential.user.email);
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    // Backfills the Firestore profile for accounts that were created before
    // this collection existed (or if a previous write ever failed) — this
    // keeps `users` self-healing instead of silently staying out of sync.
    await this.ensureUserProfile(credential.user.uid, credential.user.email);
  }

  /** Mirrors a Firebase Auth account into Firestore, but only if it isn't already there. */
  private async ensureUserProfile(uid: string, email: string | null): Promise<void> {
    const userRef = doc(this.firestore, USERS_COLLECTION, uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return;
    }

    await setDoc(userRef, {
      uid,
      email,
      createdAt: serverTimestamp(),
    });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  /** Turns a raw Firebase Auth error code into a friendly, user-facing message. */
  friendlyErrorMessage(error: unknown): string {
    const code = (error as { code?: string })?.code ?? '';

    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email.';
      case 'auth/weak-password':
        return 'Please choose a stronger password (at least 6 characters).';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
