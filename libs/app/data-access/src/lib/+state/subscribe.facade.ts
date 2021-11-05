import { StorageData } from '@speak-out/shared-util-storage';
import { AuthDataService } from '../infrastructure';
import { User, TokenResponse } from '../interfaces';
import { tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpState } from './http.state';
import { Subscribe } from '../types';

export interface SubscribeState {
  subscribed: boolean;
  user: User | null;
  step: number;
}

@Injectable()
export class SubscribeFacade extends HttpState<SubscribeState> {
  subscribed$ = this.select((state) => state.subscribed);

  user$ = this.select((state) => state.user);

  step$ = this.select((state) => state.step);

  constructor(private service: AuthDataService, readonly storage: StorageData<SubscribeState>) {
    super({
      user: null,
      subscribed: false,
      step: 0,
    });
  }

  subscribe(value: Subscribe) {
    return this.intercept(this.service.register(value)).pipe(
      switchMap((response) => this.handleLogin(response)),
      tap((user) => {
        const step = 0;
        const subscribed = true;
        this.storage.set('user', user);
        this.setState({ step, user, subscribed });
      })
    );
  }

  private handleLogin(response: TokenResponse) {
    return this.service.handleTokens(response);
  }

  loadUser() {
    this.service.getProfile().subscribe((user) => {
      const subscribed = !!user
      this.setState({ user, subscribed });
    });
  }

  clearSubscription() {
    this.setState({ subscribed: false });
  }

  setStep(step: number) {
    this.setState({ step });
  }

  prevStep() {
    const step = this.state.step - 1;
    this.setState({ step });
  }

  nextStep() {
    const step = this.state.step + 1;
    this.setState({ step });
  }
}
