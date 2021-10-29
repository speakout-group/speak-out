import {
  AuthService,
  Room,
  RoomService,
  User,
} from '@speak-out/app-data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import {
  ActionType,
  JoinRoomDialogComponent,
  UpsertRoomDialogComponent,
} from '../../components';

@Component({
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss'],
})
export class RoomsPageComponent implements OnInit, OnDestroy {
  publicRooms: Room[] = [];
  memberRooms: Room[] = [];
  user: User | null = null;
  userRooms: Room[] = [];

  loading = false;

  destroy$ = new Subject();

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private clipboard: Clipboard,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    const process = () => (this.loading = false);

    forkJoin({
      userRooms: this.roomService.getUserRooms().pipe(take(1)),
      publicRooms: this.roomService.getPublicRooms().pipe(take(1)),
      memberRooms: this.roomService.getRoomsByMember().pipe(take(1)),
    })
      .pipe(tap(process, process))
      .subscribe(({ userRooms, publicRooms, memberRooms }) => {
        this.publicRooms = publicRooms;
        this.userRooms = userRooms;
        this.memberRooms = memberRooms;
      });

    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCreateDialog() {
    const dialog = this.dialog.open(UpsertRoomDialogComponent, {
      data: {
        type: ActionType.Create,
      },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((room: Room) => {
        if (room.isPublic) {
          this.publicRooms.push(room);
        }

        this.userRooms.push(room);
      });
  }

  openJoinRoomDialog() {
    this.dialog.open(JoinRoomDialogComponent);
  }
}
