import { APP_CONFIG, AppConfig } from '../app-data-access.config';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Talk } from '../interfaces';

@Injectable()
export class TalkDataService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private config: AppConfig
  ) {}

  getTalk(id: string) {
    return this.http.get<Talk>(`${this.config.api}/talks/${id}`);
  }

  getTalks() {
    return this.http.get<Talk[]>(`${this.config.api}/talks`);
  }

  updateTalk(id: string, updateTalk: Partial<Talk>) {
    return this.http.put<Talk>(`${this.config.api}/talks/${id}`, updateTalk);
  }

  createTalk(createTalk: Omit<Talk, '_id'>) {
    return this.http.post<Talk>(`${this.config.api}/talks`, createTalk);
  }

  removeTalk(id: string) {
    return this.http.delete<Talk>(`${this.config.api}/talks/${id}`);
  }
}
