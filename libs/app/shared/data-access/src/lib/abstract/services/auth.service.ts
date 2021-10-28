// import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

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

// @Injectable({
//   providedIn: 'root'
// })
export abstract class AuthService {
  abstract user$: BehaviorSubject<User>;
  abstract user: User;

  abstract get isAuthenticated(): boolean;

  abstract login(user: Partial<User>): Observable<TokenResponse>;
  abstract register(user: Partial<User>): Observable<TokenResponse>;

  abstract loginWithGoogle(): Promise<Observable<TokenResponse>>;
  abstract loginWith(
    providerId: string,
    options?: any
  ): Promise<Observable<TokenResponse>>;

  abstract getProfile(): Observable<User>;

  abstract loginWithRefreshToken(): Observable<TokenResponse>
  
  abstract logoutFromAllDevices(): Observable<TokenResponse>
  
  
  abstract setTokens(response: TokenResponse): Promise<User>
  abstract setAccessToken(token: string): Promise<User>
  abstract getAccessToken(): string


}
