import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'core/services/auth/authentication.service';
import { AuthorizationService } from 'core/services/auth/authorization.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  const authorizationService = inject(AuthorizationService);
  /* if user is not logged in return false and redirect to login */
  if (!authenticationService.isAuthenticated()) {
    router.navigate(['/account/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
  }
  /* if there is no data in route allow the user */
  if (route.data === undefined) {
    return true;
  }
  /* get route data */
  const data: any = route.data;
  /* check if user ia authorized */
  const result = authorizationService.isAuthorized(data);
  if (result) {
    return true;
  } else {
    router.navigate(['/error/403']);
    return false;
  }
};
