import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ChangePasswordBody {
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecoverService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private appConfig: AppConfig
  ) {}

  recoverPassword(email: string) {
    return this.http.post(`${this.appConfig.api}/recover`, { email });
  }

  validateCode(code: string) {
    return this.http.get(`${this.appConfig.api}/recover/${code}`);
  }

  changePassword(code: string, body: ChangePasswordBody) {
    return this.http.post(`${this.appConfig.api}/recover/${code}`, body);
  }
}
