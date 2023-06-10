import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthHttpService } from 'libs/state/src/lib/auth/auth.http.service';


export const loggedInGuardGuard: CanActivateFn = () => {
  const oauthService: AuthHttpService = inject(AuthHttpService);
  return oauthService.isLoggedIn();
};
