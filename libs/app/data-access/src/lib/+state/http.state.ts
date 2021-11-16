import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseState } from './base.state';

export abstract class HttpState<T> extends BaseState<T> {
  private _error = new BehaviorSubject<string | null>(null);
  private _loader = new BehaviorSubject<boolean>(false);

  protected get error() {
    return this._error.getValue();
  }

  protected get loader() {
    return this._loader.getValue();
  }

  public loader$ = this._loader.asObservable();
  public error$ = this._error.asObservable();

  constructor(initialState: T) {
    super(initialState);
  }

  protected intercept<T>(subscriber: Observable<T>) {
    this._loader.next(true);
    return subscriber.pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this._error.next(err.error.message);
        }
        this._loader.next(false);
        throw err;
      })
    );
  }

  protected showLoader() {
    this._loader.next(true);
  }

  protected hideLoader() {
    this._loader.next(false);
  }
}
// STS - Simple TypeScript State
