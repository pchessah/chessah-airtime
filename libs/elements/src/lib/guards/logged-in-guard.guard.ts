import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'libs/state/src/lib/auth/auth.service';

export const loggedInGuardGuard: CanActivateFn = () => {
  const oauthService: AuthService = inject(AuthService);
  return oauthService.isLoggedIn;
};
