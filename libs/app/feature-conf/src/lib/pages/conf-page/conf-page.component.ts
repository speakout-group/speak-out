import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthService,
  Message,
  MessageType,
  Conf,
  ConfService,
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

interface InternalConf extends Conf {
  members: User[];
}

@Component({
  templateUrl: './conf-page.component.html',
  styleUrls: ['./conf-page.component.scss'],
})
export class ConfPageComponent implements OnInit, OnDestroy {
  confId: string;
  conf!: InternalConf;
  destroy$ = new Subject();
  MessageType = MessageType;
  areMembersShown = false;
  messages: Message[] = [];
  updateMessages$ = new Subject();
  user: User | null = null;
  showTotalMembers = true;

  constructor(
    private confService: ConfService,
    private route: ActivatedRoute,
    private socket: SocketService,
    private router: Router,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.confId = this.route.snapshot.params.id;
  }

  get onlineMembers() {
    return this.conf.members.filter((user) => user.online);
  }

  ngOnInit() {
    // Subscribe to conf events
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        catchError((err, conf) => {
          if (err) {
            this.router.navigate(['/confs']);
            // throw err
          }
          return conf;
        }),
        mergeMap((params) => {
          this.confId = params.id;

          return this.confService.joinConf(this.confId).pipe(take(1));
        }),
        filter((conf) => typeof conf !== 'boolean'),
        mergeMap((conf) => {
          this.conf = conf as InternalConf;

          this.changeDetector.detectChanges();

          return this.socket.onConnect();
        }),
        tap(() => {
          this.confService.subscribeConf(this.conf);

          this.updateMessages$.next();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.conf != null),
        mergeMap(() => this.confService.getConf(this.confId).pipe(take(1))),
        tap(
          (conf) => (this.conf = conf as InternalConf),
          () => this.router.navigate(['/confs'])
        )
      )
      .subscribe();

    this.confService
      .onJoinEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.conf.members.push(user);

        this.conf = this.confService.getConfWithSortedMembers(
          this.conf
        ) as InternalConf;
      });

    this.confService
      .onLeaveEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user._id === this.user?._id) {
          this.router.navigate(['/confs']);

          return;
        }

        remove(this.conf.members, (u) => u === user || u._id === user._id);
      });

    this.confService
      .onUpdateEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((conf) => (this.conf = conf as InternalConf));

    this.confService
      .onDeleteEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/confs']));

    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
