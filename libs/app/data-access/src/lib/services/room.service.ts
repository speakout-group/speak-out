import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service';
import { Room, User } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(
    private socket: SocketService,
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private appConfig: AppConfig
  ) {}

  getRoom(roomId: string) {
    return this.http
      .get<Room>(`${this.appConfig.api}/room/id/${roomId}`)
      .pipe(map(this.getRoomWithSortedMembers));
  }

  getPublicRooms() {
    return this.http.get<Room[]>(`${this.appConfig.api}/room/public`);
  }

  getRoomsByMember() {
    return this.http.get<Room[]>(`${this.appConfig.api}/room/member`);
  }

  getUserRooms() {
    return this.http.get<Room[]>(`${this.appConfig.api}/room`);
  }

  createRoom(room: Partial<Room>) {
    return this.http.post<Room>(`${this.appConfig.api}/room`, room);
  }

  deleteRoom(room: Room) {
    return this.http.delete(`${this.appConfig.api}/room/delete/${room._id}`);
  }

  updateRoom(id: string, room: Room) {
    return this.http.put<Room>(`${this.appConfig.api}/room/${id}`, room);
  }

  joinRoom(roomId: string) {
    return this.http
      .post<Room>(`${this.appConfig.api}/room/join`, { roomId })
      .pipe(map(this.getRoomWithSortedMembers));
  }

  leaveRoom(roomId: string) {
    return this.http.delete<Room>(`${this.appConfig.api}/room/leave/${roomId}`);
  }

  subscribeRoom(room: Room) {
    this.socket.emit('room:subscribe', room._id);
  }

  onLeaveEvent() {
    return this.socket.fromEvent<User>('room:leave');
  }

  onJoinEvent() {
    return this.socket.fromEvent<User>('room:join');
  }

  onUpdateEvent() {
    return this.socket
      .fromEvent<Room>('room:update')
      .pipe(map(this.getRoomWithSortedMembers));
  }

  onDeleteEvent() {
    return this.socket.fromEvent<Room>('room:delete');
  }

  getRoomWithSortedMembers(room: Room) {
    room.members = room.members.sort((a: any, b: any) =>
      a.online === b.online ? 0 : a.online ? -1 : b.online ? 1 : 0
    );

    return room;
  }
}
