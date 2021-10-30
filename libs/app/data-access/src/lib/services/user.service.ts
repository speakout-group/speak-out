import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

export interface UpdatePasswordBody {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private appConfig: AppConfig
  ) {}

  getUser(username: string) {
    return this.http.get<User>(`${this.appConfig.api}/user/${username}`);
  }

  updateUsername(username: string) {
    return this.http.put(`${this.appConfig.api}/settings/username`, {
      username,
    });
  }

  updateEmail(email: string) {
    return this.http.put(`${this.appConfig.api}/settings/email`, { email });
  }

  updatePassword(data: UpdatePasswordBody) {
    return this.http.put(`${this.appConfig.api}/settings/password`, data);
  }
}
