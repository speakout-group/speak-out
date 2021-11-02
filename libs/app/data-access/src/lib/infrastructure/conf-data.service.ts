import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { SocketService } from '../services/socket.service';
import { getEntityWithSortedMembers } from '../utils';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conf, User } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfDataService {
  constructor(
    private socket: SocketService,
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private config: AppConfig
  ) {}

  getConf(confId: string) {
    return this.http
      .get<Conf>(`${this.config.api}/conf/id/${confId}`)
      .pipe(map(getEntityWithSortedMembers));
  }

  getPublicConfs() {
    return this.http.get<Conf[]>(`${this.config.api}/conf/public`);
  }

  getConfsByMember() {
    return this.http.get<Conf[]>(`${this.config.api}/conf/member`);
  }

  getConfsByConf() {
    return this.http.get<Conf[]>(`${this.config.api}/conf/member`);
  }

  getUserConfs() {
    return this.http.get<Conf[]>(`${this.config.api}/conf`);
  }
  getConfs() {
    return this.http.get<Conf[]>(`${this.config.api}/conf`);
  }

  createConf(conf: Partial<Conf>) {
    return this.http.post<Conf>(`${this.config.api}/conf`, conf);
  }

  deleteConf(conf: Conf) {
    return this.http.delete(`${this.config.api}/conf/delete/${conf._id}`);
  }

  updateConf(id: string, conf: Conf) {
    return this.http.put<Conf>(`${this.config.api}/conf/${id}`, conf);
  }

  joinConf(confId: string) {
    return this.http
      .post<Conf>(`${this.config.api}/conf/join`, { confId })
      .pipe(map(getEntityWithSortedMembers));
  }

  leaveConf(confId: string) {
    return this.http.delete<Conf>(
      `${this.config.api}/conf/leave/${confId}`
    );
  }

  subscribeConf(conf: Conf) {
    return this.socket.emit('conf:subscribe', conf._id);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('conf:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('conf:join');
  }

  onUpdateEvent() {
    return this.socket
      .fromEvent<Conf>('conf:update')
      .pipe(map(getEntityWithSortedMembers));
  }

  onDeleteEvent() {
    return this.socket.fromEvent<Conf>('conf:delete');
  }
}
