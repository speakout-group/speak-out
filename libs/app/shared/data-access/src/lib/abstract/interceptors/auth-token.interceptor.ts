// import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

// @Injectable()
export abstract class AuthTokenInterceptor implements HttpInterceptor {
  static skipHeader = 'skipTokenInterceptor';

  constructor(private authService: AuthService) {}

  private skipRequest(request: HttpRequest<unknown>) {
    request = request.clone({
      headers: request.headers.set(AuthTokenInterceptor.skipHeader, 'true'),
    });

    return this.handleRequest(request);
  }

  private handleRequest(request: HttpRequest<unknown>) {
    const token = this.authService.getAccessToken();

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return request;
  }

  abstract intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>>;
}
