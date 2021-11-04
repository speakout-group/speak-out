import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';

export abstract class BaseState<T> {
  protected destroy = new Subject<void>();
  private _error = new BehaviorSubject<string | null>(null)
  private _loader = new BehaviorSubject<boolean>(false)
  private state$: BehaviorSubject<T>;

  protected get error() {
    return this._error.getValue()
  }
  
  protected get state(): T {
    return this.state$.getValue();
  }
  
  public loader$ = this._loader.asObservable()
  public error$ = this._error.asObservable()

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }

  protected intercept<T>(subscriber: Observable<T>) {
    this._loader.next(true)
    return subscriber.pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this._error.next(err.error.message)
          this._loader.next(false)
        }
        throw err
      })
    )
  }
}
