import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthService,
  Message,
  MessageType,
  Room,
  RoomService,
  SocketService,
  User,
} from '@speak-out/app-data-access';
import { remove } from 'lodash';
import { interval, of, Subject } from 'rxjs';
import {
  tap,
  map,
  take,
  filter,
  mergeMap,
  takeUntil,
  catchError,
} from 'rxjs/operators';

interface InternalRoom extends Room {
  members: User[];
}

@Component({
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit, OnDestroy {
  roomId: string;
  room!: InternalRoom;
  destroy$ = new Subject();
  MessageType = MessageType;
  areMembersShown = false;
  messages: Message[] = [];
  updateMessages$ = new Subject();
  user: User | null = null;
  showTotalMembers = true;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private socket: SocketService,
    private router: Router,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.roomId = this.route.snapshot.params.id;
  }

  get onlineMembers() {
    return this.room.members.filter((user) => user.online);
  }

  ngOnInit() {
    // Subscribe to room events
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        catchError((err, room) => {
          if (err) {
            this.router.navigate(['/rooms']);
            // throw err
          }
          return room;
        }),
        mergeMap((params) => {
          this.roomId = params.id;

          return this.roomService.joinRoom(this.roomId).pipe(take(1));
        }),
        filter((room) => typeof room !== 'boolean'),
        mergeMap((room) => {
          this.room = room as InternalRoom;

          this.changeDetector.detectChanges();

          return this.socket.onConnect();
        }),
        tap(() => {
          this.roomService.subscribeRoom(this.room);

          this.updateMessages$.next();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.room != null),
        mergeMap(() => this.roomService.getRoom(this.roomId).pipe(take(1))),
        tap(
          (room) => (this.room = room as InternalRoom),
          () => this.router.navigate(['/rooms'])
        )
      )
      .subscribe();

    this.roomService
      .onJoinEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.room.members.push(user);

        this.room = this.roomService.getRoomWithSortedMembers(
          this.room
        ) as InternalRoom;
      });

    this.roomService
      .onLeaveEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user._id === this.user?._id) {
          this.router.navigate(['/rooms']);

          return;
        }

        remove(this.room.members, (u) => u === user || u._id === user._id);
      });

    this.roomService
      .onUpdateEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((room) => (this.room = room as InternalRoom));

    this.roomService
      .onDeleteEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/rooms']));

    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
