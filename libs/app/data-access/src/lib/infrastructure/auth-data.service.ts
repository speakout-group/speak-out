import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(
    private http: HttpClient,
    private socialService: SocialAuthService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  login(user: Partial<User>) {
    return this.http.post<TokenResponse>(`${this.config.api}/auth/login`, user);
  }

  loginWithGoogle() {
    return this.loginWith(GoogleLoginProvider.PROVIDER_ID, {
      scope: 'profile email',
    });
  }

  private async loginWith(providerId: string, options?: any) {
    const user = await this.socialService.signIn(providerId);
    console.log(this.config.api);

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

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
