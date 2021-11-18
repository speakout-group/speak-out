import {
  Route,
  Router,
  UrlTree,
  CanLoad,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthFacade } from '../+state';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamGuard implements CanActivate, CanLoad {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canLoad(route: Route): Observable<boolean | UrlTree> | boolean {
    const isAuthenticated$ = this.checkAuth(route.path);

    this.authFacade.loadUser();

    return isAuthenticated$;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const isAuthenticated$ = this.checkAuth(state.url);

    this.authFacade.loadUser();

    return isAuthenticated$;
  }

  private checkAuth(url?: string) {
    return this.authFacade.user$.pipe(
      map((user) => {
        if (!user) {
          console.log('user: ', user);

          const queryParams = url ? { returnUrl: url } : {};
          this.router.navigate(['/auth', 'login'], { queryParams });
        }
        return !!user;
      })
    );
  }
}
