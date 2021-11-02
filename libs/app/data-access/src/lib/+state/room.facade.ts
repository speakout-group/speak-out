import { RoomService } from '../services/room.service';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { Room } from '../interfaces';

export interface RoomState {
  loading: boolean;
  publicRooms: Room[];
  memberRooms: Room[];
  userRooms: Room[];
  room: Room | null;
}

@Injectable()
export class RoomFacade extends BaseState<RoomState> {
  loading$ = this.select((state) => state.loading);

  publicRooms$ = this.select((state) => state.publicRooms);
  memberRooms$ = this.select((state) => state.memberRooms);
  userRooms$ = this.select((state) => state.userRooms);
  room$ = this.select((state) => state.room);

  constructor(private service: RoomService) {
    super({
      loading: false,
      publicRooms: [],
      memberRooms: [],
      userRooms: [],
      room: null
    });
  }

  loadRoom(id: string) {
    this.setState({ loading: true });
    this.service.getRoom(id).subscribe((room) => {
      this.setState({ room });
      this.setState({ loading: false });
    });
  }

  joinRoom(id: string) {
    this.setState({ loading: true });
    this.service.joinRoom(id).subscribe((room) => {
      this.setState({ room });
      this.setState({ loading: false });
    });
  }

  loadRoomsByConf(confId: string) {
    this.setState({ loading: true });

    this.service.joinRoom(confId).subscribe((room) => {
      this.setState({ room });
      this.setState({ loading: false });
    });
  }

  loadUserRooms() {
    this.setState({ loading: true });
    this.service.getUserRooms().subscribe((userRooms) => {
      this.setState({ userRooms });
      this.setState({ loading: false });
    });
  }

  loadPublicRooms() {
    this.setState({ loading: true });
    this.service.getPublicRooms().subscribe((publicRooms) => {
      this.setState({ publicRooms });
      this.setState({ loading: false });
    });
  }

  loadMemberRooms() {
    this.setState({ loading: true });
    this.service.getRoomsByMember().subscribe((memberRooms) => {
      this.setState({ memberRooms });
      this.setState({ loading: false });
    });
  }
}
