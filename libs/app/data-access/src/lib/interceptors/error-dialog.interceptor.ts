import { AuthTokenInterceptor } from './auth-token.interceptor';
import { ErrorService } from '@speak-out/shared-ui-dialogs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

export interface HttpError {
  statusCode: number;
  message: string;
  error?: string;
}

@Injectable()
export class ErrorDialogInterceptor implements HttpInterceptor {
  static skipHeader = 'errorDialog';

  constructor(
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.has(ErrorDialogInterceptor.skipHeader)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      tap(
        () => null,
        (response) => {
          if (response instanceof HttpErrorResponse) {
            if (
              response.status === 401 &&
              this.authService.getRefreshToken() &&
              !request.headers.has(AuthTokenInterceptor.skipHeader)
            ) {
              return;
            }

            this.handleError(response.error);
          }
        }
      )
    );
  }

  handleError(err: HttpError) {
    this.errorService.open({
      data: {
        title: err.error || 'Error',
        message: err.message,
      },
      width: '350px',
    });
  }
}
