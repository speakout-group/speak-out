import {
  Route,
  Router,
  UrlTree,
  CanLoad,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TalksGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthDataService,
    private router: Router
  ) { }

  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this.checkAuth(route.path);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this.checkAuth(state.url);
  }

  private checkAuth(url?: string) {
    if (!this.authService.getAccessToken()) {
      return this.router.navigate(['/auth', 'login']);
    }

    return this.authService.getProfile()
      .pipe(
        map(user => !!user),
        tap((auth) => {
          if (!auth) {
            const queryParams = url ? { returnUrl: url } : {};
            this.router.navigate(['/auth', 'login'], { queryParams });
          }
        })
      )
  }
}
