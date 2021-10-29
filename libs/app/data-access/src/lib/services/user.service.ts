import { API_TOKEN } from '@speak-out/app/shared/data-access';
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
    @Inject(API_TOKEN) private api: string
  ) {}

  getUser(username: string) {
    return this.http.get<User>(`${this.api}/user/${username}`);
  }

  updateUsername(username: string) {
    return this.http.put(`${this.api}/settings/username`, { username });
  }

  updateEmail(email: string) {
    return this.http.put(`${this.api}/settings/email`, { email });
  }

  updatePassword(data: UpdatePasswordBody) {
    return this.http.put(`${this.api}/settings/password`, data);
  }
}
