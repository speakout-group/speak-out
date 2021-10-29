import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
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

export const ERROR_DIALOG = new InjectionToken<ComponentType<unknown>>(
  'error.dialog'
);

@Injectable()
export class ErrorDialogInterceptor implements HttpInterceptor {
  static skipHeader = 'errorDialog';

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    @Inject(ERROR_DIALOG)
    private errorDialog: ComponentType<unknown>
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
    this.dialog.open(this.errorDialog, {
      data: {
        title: err.error || 'Error',
        message: err.message,
      },
      width: '350px',
    });
  }
}
