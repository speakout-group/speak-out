import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { SocketService } from '../services/socket.service';
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

  getSponsor(id: string) {
    return this.http.get<SponsorRaw>(`${this.config.api}/sponsors/${id}`);
  }

  getSponsors() {
    return this.http.get<SponsorRaw[]>(`${this.config.api}/sponsors`);
  }

  updateSponsor(id: string, updateSponsor: Partial<SponsorRaw>) {
    return this.http.put<SponsorRaw>(`${this.config.api}/sponsors/${id}`, updateSponsor);
  }

  createSponsor(createSponsor: Omit<SponsorRaw, '_id'>) {
    return this.http.post<SponsorRaw>(`${this.config.api}/sponsors`, createSponsor);
  }

  removeSponsor(id: string) {
    return this.http.delete<SponsorRaw>(`${this.config.api}/sponsors/${id}`);
  }

  joinSponsor(sponsorId: string) {
    return this.http
      .post<SponsorRaw>(`${this.config.api}/sponsors/join`, { sponsorId })
      .pipe(map(this.getSponsorWithSortedMembers));
  }

  leaveSponsor(sponsorId: string) {
    return this.http.delete<SponsorRaw>(`${this.config.api}/sponsors/leave/${sponsorId}`);
  }

  subscribeSponsor(sponsorId: string) {
    this.socket.emit('sponsor:subscribe', sponsorId);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('sponsor:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('sponsor:join');
  }

  getSponsorWithSortedMembers(sponsor: SponsorRaw) {
    sponsor.members = (sponsor.members ?? []).sort((a: any, b: any) =>
      a.online === b.online ? 0 : a.online ? -1 : b.online ? 1 : 0
    );

    return sponsor;
  }
}
