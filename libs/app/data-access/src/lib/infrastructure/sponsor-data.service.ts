import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { SocketService } from '../services/socket.service';
import { getEntityWithSortedMembers } from '../utils';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SponsorRaw, User } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SponsorDataService {
  constructor(
    private socket: SocketService,
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private config: AppConfig
  ) {}

  getSponsor(sponsorId: string) {
    return this.http
      .get<SponsorRaw>(`${this.config.api}/sponsor/id/${sponsorId}`)
      .pipe(map(getEntityWithSortedMembers));
  }

  getPublicSponsors() {
    return this.http.get<SponsorRaw[]>(`${this.config.api}/sponsor/public`);
  }

  getSponsorsByMember() {
    return this.http.get<SponsorRaw[]>(`${this.config.api}/sponsor/member`);
  }

  getUserSponsors() {
    return this.http.get<SponsorRaw[]>(`${this.config.api}/sponsor`);
  }
  getSponsors() {
    return this.http.get<SponsorRaw[]>(`${this.config.api}/sponsor`);
  }

  createSponsor(sponsor: Partial<SponsorRaw>) {
    return this.http.post<SponsorRaw>(`${this.config.api}/sponsor`, sponsor);
  }

  deleteSponsor(sponsor: SponsorRaw) {
    return this.http.delete(`${this.config.api}/sponsor/delete/${sponsor._id}`);
  }

  updateSponsor(id: string, sponsor: SponsorRaw) {
    return this.http.put<SponsorRaw>(`${this.config.api}/sponsor/${id}`, sponsor);
  }

  joinSponsor(sponsorId: string) {
    return this.http
      .post<SponsorRaw>(`${this.config.api}/sponsor/join`, { sponsorId })
      .pipe(map(getEntityWithSortedMembers));
  }

  leaveSponsor(sponsorId: string) {
    return this.http.delete<SponsorRaw>(
      `${this.config.api}/sponsor/leave/${sponsorId}`
    );
  }

  subscribeSponsor(sponsor: SponsorRaw) {
    return this.socket.emit('sponsor:subscribe', sponsor._id);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('sponsor:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('sponsor:join');
  }

  onUpdateEvent() {
    return this.socket
      .fromEvent<SponsorRaw>('sponsor:update')
      .pipe(map(getEntityWithSortedMembers));
  }

  onDeleteEvent() {
    return this.socket.fromEvent<SponsorRaw>('sponsor:delete');
  }
}
