import { AuthDataService } from '../infrastructure';
import { User, TokenResponse } from '../interfaces';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BaseState } from './base.state';
import { Login } from '../types';

export interface AuthState {
  loading: boolean;
  user: User | null;
  redirect: string;
}

@Injectable()
export class AuthFacade extends BaseState<AuthState> {
  loading$ = this.select((state) => state.loading);

  redirect$ = this.select((state) => state.redirect);

  user$ = this.select((state) => state.user);

  constructor(private service: AuthDataService) {
    super({
      loading: false,
      redirect: '/',
      user: null,
    });
  }

  loadUser() {
    this.setState({ loading: true });
    this.service.getProfile().subscribe((user) => {
      this.setState({ user });
      this.setState({ loading: false });
    });
  }

  login({ username, password }: Login) {
    this.setState({ loading: true });
    this.service
      .login({ username, password })
      .pipe(switchMap((res) => this.handleLogin(res)))
      .subscribe((user) => {
        const redirect = this.service.getLoginCallbackUrl();
        const state = { user, redirect, loading: false };
        this.setState(state);
      });
  }

  handleLogin(response: TokenResponse) {
    return this.service.handleTokens(response);
  }

  setRedirect(url: string) {
    this.setState({ redirect: url });
    this.service.setLoginCallbackUrl(url);
  }

  withGoogle() {
    this.service.loginWithGoogle();
  }

  logout() {
    this.service.logout();
    this.setState({ user: null });
  }
}
