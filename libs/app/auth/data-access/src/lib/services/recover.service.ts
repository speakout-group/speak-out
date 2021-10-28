import { API_TOKEN } from '@speak-out/app/shared/data-access';
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
    @Inject(API_TOKEN) private api: string
  ) {}

  recoverPassword(email: string) {
    return this.http.post(`${this.api}/recover`, { email });
  }

  validateCode(code: string) {
    return this.http.get(`${this.api}/recover/${code}`);
  }

  changePassword(code: string, body: ChangePasswordBody) {
    return this.http.post(`${this.api}/recover/${code}`, body);
  }
}
