import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export class BaseService {
  private _error = new BehaviorSubject<string | null>(null);
  readonly error$ = this._error.asObservable();

  protected handlingError<T>(subscriber: Observable<T>) {
    return subscriber.pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this._error.next(err.error.message);
        }
        throw err;
      })
    );
  }
}
