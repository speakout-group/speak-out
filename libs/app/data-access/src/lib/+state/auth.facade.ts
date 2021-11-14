import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthDataService } from '../infrastructure';
import { User, TokenResponse } from '../interfaces';
import { Injectable } from '@angular/core';
import { HttpState } from './http.state';
import { Login } from '../types';

export interface AuthState {
  redirect: string | number | symbol;
  user?: User | null;
}

@Injectable()
export class AuthFacade extends HttpState<AuthState> {
  redirect$ = this.select((state) => state.redirect);

  user$ = this.select((state) => state.user);

  get accesssToken() {
    return this.service.getAccessToken();
  }

  get isAuthenticated() {
    return !!this.state.user;
  }

  constructor(private service: AuthDataService) {
    super({
      redirect: '/',
    });
  }

  loadUser() {
    this.service
      .getProfile()
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            this.setState({ user: null });
          }
          throw err;
        })
      )
      .subscribe((user) => {
        this.setState({ user });
      });
  }

  login({ username, password }: Login) {
    this.service
      .login({ username, password })
      .pipe(switchMap((res) => this.handleLogin(res)))
      .subscribe((user) => {
        const redirect = this.service.getLoginCallbackUrl();
        const state = { user, redirect };
        this.setState(state);
      });
  }

  register(user: Partial<User>) {
    return this.intercept(this.service.register(user));
  }

  handleLogin(response: TokenResponse) {
    return this.service.handleTokens(response);
  }

  setRedirect(url: string) {
    this.setState({ redirect: url });
    this.service.setLoginCallbackUrl(url);
  }

  withGoogle() {
    return this.service.loginWithGoogle();
  }

  logout() {
    this.service.logout();
    this.setState({ user: null });
  }
}
