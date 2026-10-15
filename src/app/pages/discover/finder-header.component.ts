import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-finder-header',
  imports: [RouterLink],
  templateUrl: './finder-header.component.html',
  styleUrl: './finder-header.component.scss',
})
export class FinderHeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly isLoggingOut = signal(false);
  readonly logoutError = signal('');

  async logout(): Promise<void> {
    if (this.isLoggingOut()) return;
    this.isLoggingOut.set(true);
    this.logoutError.set('');
    try {
      await this.auth.logout();
      await this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (error) {
      this.logoutError.set(this.auth.friendlyErrorMessage(error));
    } finally {
      this.isLoggingOut.set(false);
    }
  }
}
