import { AuthDataService } from '../infrastructure';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
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
      catchError((err, caught) => {
        if (err) {
          if (err.status === 401) {
            this.authService.logout();
          }
          throw err;
        }
        return caught;
      })
    );
  }
}
