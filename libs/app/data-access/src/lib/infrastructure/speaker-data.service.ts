import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { SocketService } from '../services/socket.service';
import { getEntityWithSortedMembers } from '../utils';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Speaker, User } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpeakerDataService {
  constructor(
    private socket: SocketService,
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private config: AppConfig
  ) {}

  getSpeaker(speakerId: string) {
    return this.http.get<Speaker>(`${this.config.api}/speaker/id/${speakerId}`);
  }

  getPublicSpeakers() {
    return this.http.get<Speaker[]>(`${this.config.api}/speaker/public`);
  }

  getSpeakersByMember() {
    return this.http.get<Speaker[]>(`${this.config.api}/speaker/member`);
  }

  getUserSpeakers() {
    return this.http.get<Speaker[]>(`${this.config.api}/speaker`);
  }
  getSpeakers() {
    return this.http.get<Speaker[]>(`${this.config.api}/speaker`);
  }

  createSpeaker(speaker: Partial<Speaker>) {
    return this.http.post<Speaker>(`${this.config.api}/speaker`, speaker);
  }

  deleteSpeaker(speaker: Speaker) {
    return this.http.delete(`${this.config.api}/speaker/delete/${speaker._id}`);
  }

  updateSpeaker(id: string, speaker: Speaker) {
    return this.http.put<Speaker>(`${this.config.api}/speaker/${id}`, speaker);
  }

  joinSpeaker(speakerId: string) {
    return this.http.post<Speaker>(`${this.config.api}/speaker/join`, {
      speakerId,
    });
  }

  leaveSpeaker(speakerId: string) {
    return this.http.delete<Speaker>(
      `${this.config.api}/speaker/leave/${speakerId}`
    );
  }

  subscribeSpeaker(speaker: Speaker) {
    return this.socket.emit('speaker:subscribe', speaker._id);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('speaker:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('speaker:join');
  }

  onUpdateEvent() {
    return this.socket.fromEvent<Speaker>('speaker:update');
    // .pipe(map(getEntityWithSortedMembers));
  }

  onDeleteEvent() {
    return this.socket.fromEvent<Speaker>('speaker:delete');
  }
}
