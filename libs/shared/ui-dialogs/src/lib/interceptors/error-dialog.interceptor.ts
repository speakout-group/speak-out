import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { StorageData } from "@speak-out/shared-util-storage";
import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

export interface HttpError {
  statusCode: number;
  message: string;
  error?: string;
}

@Injectable()
export class ErrorDialogInterceptor implements HttpInterceptor {
  static skipHeader = 'errorDialog';

  constructor(
    private dialog: MatDialog,
    private storage: StorageData
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
              this.storage.get('refreshToken') &&
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
