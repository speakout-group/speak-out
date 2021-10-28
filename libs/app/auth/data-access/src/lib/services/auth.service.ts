import { AppleLoginProvider } from '../providers/apple-login.provider';
import { API_TOKEN } from '@speak-out/app/shared/data-access';
import { mergeMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
import Swal from 'sweetalert2';
import { AuthTokenInterceptor } from '../interceptors/auth-token.interceptor';
// import { ErrorDialogInterceptor } from '../../../core/interceptor/error-dialog.interceptor';
import { SubscriptionService } from './subscription.service';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  online: boolean;
  isSocial: boolean;
}

// const { api } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  get user(): User | null {
    return this.user$.getValue();
  }

  get isAuthenticated(): boolean {
    return this.user != null;
  }

  constructor(
    private http: HttpClient,
    private socialService: SocialAuthService,
    private router: Router,
    @Inject(API_TOKEN) private api: string,
    private subscriptionService: SubscriptionService
  ) {}

  login(user: Partial<User>) {
    return this.http
      .post<TokenResponse>(`${this.api}/auth/login`, user)
      .pipe(mergeMap((response) => this.setTokens(response)));
  }

  loginWithFacebook() {
    return this.loginWith(FacebookLoginProvider.PROVIDER_ID, {
      scope: 'email,public_profile',
      return_scopes: true,
      enable_profile_selector: true,
    });
  }

  loginWithGoogle() {
    return this.loginWith(GoogleLoginProvider.PROVIDER_ID, {
      scope: 'profile email',
    });
  }

  loginWithApple() {
    return this.loginWith(AppleLoginProvider.PROVIDER_ID, {
      scope: 'profile email',
    });
  }

  async handleSocialLogin(method: () => Promise<Observable<User>>) {
    return new Promise<void>((resolve, reject) => {
      try {
        (async () => {
          const observer = await method();

          return observer.pipe(take(1)).subscribe(
            () => {
              resolve();

              this.redirectToCallback();
            },
            (e) => reject(e)
          );
        })();
      } catch (e: any) {
        Swal.fire({
          title: 'Oops...!',
          text:
            e.message ||
            e.details ||
            'An error occurred completing the authentication',
          icon: 'error',
        });

        reject(e);
      }
    });
  }

  private async loginWith(providerId: string, options?: any) {
    const user = await this.socialService.signIn(providerId);

    return this.http
      .post<TokenResponse>(
        `${this.api}/auth/${this.getProviderUri(providerId)}-login`,
        {
          name: user.name,
          accessToken: user.authToken,
          authorizationCode: user.authorizationCode,
          type: 'web',
        }
      )
      .pipe(
        take(1),
        mergeMap((tokens) => this.setTokens(tokens))
      );
  }

  private getProviderUri(providerId: string) {
    switch (providerId) {
      case FacebookLoginProvider.PROVIDER_ID:
        return 'facebook';
      case GoogleLoginProvider.PROVIDER_ID:
        return 'google';
      case AppleLoginProvider.PROVIDER_ID:
        return 'apple';
      default:
        return undefined;
    }
  }

  register(user: Partial<User>) {
    return this.http
      .post<TokenResponse>(`${this.api}/auth/register`, user)
      .pipe(mergeMap((response) => this.setTokens(response)));
  }

  getProfile() {
    return this.http
      .get<User>(`${this.api}/auth/me`, {
        headers: {
          [ErrorDialogInterceptor.skipHeader]: 'true',
        },
      })
      .pipe(tap((user) => this.user$.next(user)));
  }

  loginWithRefreshToken() {
    return this.http
      .post<TokenResponse>(
        `${this.api}/auth/refresh-token`,
        {
          refreshToken: this.getRefreshToken(),
        },
        {
          headers: {
            [AuthTokenInterceptor.skipHeader]: 'true',
          },
        }
      )
      .pipe(mergeMap((response) => this.setTokens(response)));
  }

  logoutFromAllDevices() {
    return this.http
      .delete<TokenResponse>(`${this.api}/auth/logout-from-all-devices`)
      .pipe(
        mergeMap((tokens) => this.setTokens(tokens)),
        tap(() => this.subscriptionService.requestSubscription())
      );
  }

  async setTokens(response: TokenResponse) {
    this.setRefreshToken(response.refresh_token);

    return this.setAccessToken(response.access_token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);

    return this.getProfile().toPromise();
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getLoginCallbackUrl() {
    return localStorage.getItem('loginCallbackUrl');
  }

  setLoginCallbackUrl(url: string) {
    localStorage.setItem('loginCallbackUrl', url);
  }

  async redirectToCallback() {
    const output = await this.router.navigate([
      this.getLoginCallbackUrl() || '/',
    ]);

    this.setLoginCallbackUrl('');

    return output;
  }

  logout() {
    const callback = () => {
      sessionStorage.clear();

      localStorage.clear();

      this.user$.next(null);
    };

    this.subscriptionService
      .delete()
      .pipe(take(1))
      .subscribe(callback, callback);
  }
}