import { APP_CONFIG, AppConfig } from '../app-data-access.config';
import { RawTalk, Talk, User } from '../interfaces';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../services';
import { map } from 'rxjs/operators';

@Injectable()
export class TalkDataService {
  constructor(
    private http: HttpClient,
    private socket: SocketService,
    @Inject(APP_CONFIG)
    private config: AppConfig
  ) {}

  getTalk(id: string) {
    return this.http.get<RawTalk>(`${this.config.api}/talks/${id}`);
  }

  getTalks() {
    return this.http.get<RawTalk[]>(`${this.config.api}/talks`);
  }

  updateTalk(id: string, updateTalk: Partial<Talk>) {
    return this.http.put<RawTalk>(`${this.config.api}/talks/${id}`, updateTalk);
  }

  createTalk(createTalk: Omit<Talk, '_id'>) {
    return this.http.post<RawTalk>(`${this.config.api}/talks`, createTalk);
  }

  removeTalk(id: string) {
    return this.http.delete<RawTalk>(`${this.config.api}/talks/${id}`);
  }

  joinTalk(talkId: string) {
    return this.http
      .post<RawTalk>(`${this.config.api}/talks/join`, { talkId })
      .pipe(map(this.getTalkWithSortedMembers));
  }

  leaveTalk(talkId: string) {
    return this.http.delete<RawTalk>(`${this.config.api}/talks/leave/${talkId}`);
  }

  subscribeTalk(talkId: string) {
    this.socket.emit('talk:subscribe', talkId);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('talk:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('talk:join');
  }


  getTalkWithSortedMembers(talk: RawTalk) {
    talk.members = (talk.members ?? []).sort((a: any, b: any) =>
      a.online === b.online ? 0 : a.online ? -1 : b.online ? 1 : 0
    );

    return talk;
  }
}
