import { AuthDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  static skipHeader = 'skipTokenInterceptor';

  constructor(private authService: AuthDataService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.getAccessToken()) {
      const token = `Bearer ${this.authService.getAccessToken()}`;
      request = request.clone({
        headers: request.headers.set('Authorization', token),
      });
    }

    return next.handle(request).pipe(
      tap((ev: HttpEvent<unknown>) => {
        if (ev instanceof HttpResponse && ev.status === 401) {
          this.authService.logout();
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
