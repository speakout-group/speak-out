import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { SocketService } from '../services/socket.service';
import { getEntityWithSortedMembers } from '../utils';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sponsor, User } from '../interfaces';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SponsorDataService {
  constructor(
    private socket: SocketService,
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private config: AppConfig
  ) { }

  getSponsor(sponsorId: string) {
    return this.http
      .get<Sponsor>(`${this.config.api}/sponsor/id/${sponsorId}`)
      .pipe(map(getEntityWithSortedMembers));
  }

  getPublicSponsors() {
    return this.http.get<Sponsor[]>(`${this.config.api}/sponsor/public`);
  }

  getSponsorsByMember() {
    return this.http.get<Sponsor[]>(`${this.config.api}/sponsor/member`);
  }

  getUserSponsors() {
    return this.http.get<Sponsor[]>(`${this.config.api}/sponsor`);
  }
  getSponsors() {
    return this.http.get<Sponsor[]>(`${this.config.api}/sponsor`);
  }

  createSponsor(conf: Partial<Sponsor>) {
    return this.http.post<Sponsor>(`${this.config.api}/sponsor`, conf);
  }

  deleteSponsor(conf: Sponsor) {
    return this.http.delete(`${this.config.api}/sponsor/delete/${conf._id}`);
  }

  updateSponsor(id: string, conf: Sponsor) {
    return this.http.put<Sponsor>(`${this.config.api}/sponsor/${id}`, conf);
  }

  joinSponsor(sponsorId: string) {
    return this.http
      .post<Sponsor>(`${this.config.api}/sponsor/join`, { sponsorId })
      .pipe(map(getEntityWithSortedMembers));
  }

  leaveSponsor(sponsorId: string) {
    return this.http.delete<Sponsor>(`${this.config.api}/sponsor/leave/${sponsorId}`);
  }

  subscribeSponsor(conf: Sponsor) {
    this.socket.emit('conf:subscribe', conf._id);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('conf:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('conf:join');
  }

  onUpdateEvent() {
    return this.socket
      .fromEvent<Sponsor>('conf:update')
      .pipe(map(getEntityWithSortedMembers));
  }

  onDeleteEvent() {
    return this.socket.fromEvent<Sponsor>('conf:delete');
  }
}
