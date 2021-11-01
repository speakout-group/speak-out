import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { StorageData } from '@speak-out/shared-util-storage';
import { User, TokenResponse } from '../interfaces';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(
    @Inject(APP_CONFIG)
    private config: AppConfig,
    private http: HttpClient,
    private storage: StorageData,
    private social: SocialAuthService,
  ) {}

  login(user: Partial<User>) {
    return this.http.post<TokenResponse>(`${this.config.api}/auth/login`, user);
  }

  loginWithGoogle() {
    return this.loginWith(GoogleLoginProvider.PROVIDER_ID, {
      scope: 'profile email',
    });
  }

  private async loginWith(providerId: string, options?: unknown) {
    const user = await this.social.signIn(providerId);

    return this.http.post<TokenResponse>(
      `${this.config.api}/auth/google-login`,
      {
        name: user.name,
        accessToken: user.authToken,
        authorizationCode: user.authorizationCode,
        type: 'web',
      }
    );
  }

  register(user: Partial<User>) {
    return this.http.post<TokenResponse>(
      `${this.config.api}/auth/register`,
      user
    );
  }

  getProfile() {
    return this.http.get<User>(`${this.config.api}/auth/me`);
  }

  loginWithRefreshToken() {
    return this.http.post<TokenResponse>(
      `${this.config.api}/auth/refresh-token`,
      { refreshToken: this.getRefreshToken() }
    );
  }

  async setTokens({ refresh_token, access_token }: TokenResponse) {
    this.setRefreshToken(refresh_token);

    return this.setAccessToken(access_token);
  }
  
  handleTokens({ refresh_token, access_token }: TokenResponse) {
    this.setRefreshToken(refresh_token);
    this.setAccessToken(access_token);
    return this.getProfile();
  }

  getAccessToken() {
    return this.storage.get('accessToken');
  }

  async setAccessToken(token: string) {
    this.storage.set('accessToken', token);
  }

  getRefreshToken() {
    return this.storage.get('refreshToken');
  }
  
  setRefreshToken(token: string) {
    this.storage.set('refreshToken', token);
  }
  
  getLoginCallbackUrl() {
    return this.storage.get('loginCallbackUrl') ?? '/';
  }

  setLoginCallbackUrl(url: string) {
    this.storage.set('loginCallbackUrl', url);
  }

  logout() {
    this.storage.clear();
  }
}
