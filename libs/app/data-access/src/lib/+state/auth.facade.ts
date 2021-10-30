import { StorageData } from '@speak-out/shared-util-storage';
import { AuthService } from '../services/auth.service';
import { AuthDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { User } from '../interfaces';

export interface AuthState {
  loading: boolean;
  user: User | null;
}

@Injectable()
export class AuthFacade extends BaseState<AuthState> {
  loading$ = this.select((state) => state.loading);

  user$ = this.select((state) => state.user);

  constructor(private service: AuthDataService, private storage: StorageData) {
    super({
      loading: false,
      user: null,
    });

    console.log(storage);
  }

  loadUser() {
    this.setState({ loading: true });
    this.service.getProfile().subscribe((user) => {
      this.setState({ user });
      this.setState({ loading: false });
    });
  }

  login({ username, password }: Pick<User, 'username' | 'password'>) {
    this.service.login({ username, password });
  }

  withGoogle() {
    this.service.loginWithGoogle();
  }

  logout() {
    this.service.logout();
    this.setState({ user: null })
  }
}
