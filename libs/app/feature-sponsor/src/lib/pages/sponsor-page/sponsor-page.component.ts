import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  User,
  Sponsor,
  Message,
  AuthService,
  MessageType,
  SponsorFacade,
  SocketService,
} from '@speak-out/app-data-access';
import { remove } from 'lodash';
import { interval, Subject } from 'rxjs';
import {
  tap,
  map,
  take,
  filter,
  mergeMap,
  takeUntil,
  catchError,
} from 'rxjs/operators';

interface InternalSponsor extends Sponsor {
  members: User[];
}

@Component({
  templateUrl: './sponsor-page.component.html',
  styleUrls: ['./sponsor-page.component.scss'],
})
export class SponsorPageComponent  {
  // sponsorId: string;
  // sponsor!: InternalSponsor;
  // destroy$ = new Subject();
  // MessageType = MessageType;
  // areMembersShown = false;
  // messages: Message[] = [];
  // updateMessages$ = new Subject();
  // user: User | null = null;
  // showTotalMembers = true;

  // constructor(
  //   private facade: SponsorFacade,
  //   private route: ActivatedRoute,
  //   private socket: SocketService,
  //   private router: Router,
  //   private authService: AuthService
  // ) {
  //   this.sponsorId = this.route.snapshot.params.id;
  // }

  // get onlineMembers() {
  //   return this.sponsor.members.filter((user) => user.online);
  // }

  // ngOnInit() {
  //   // Subscribe to sponsor events
  //   this.route.params
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       catchError((err, sponsor) => {
  //         if (err) {
  //           this.router.navigate(['/sponsors']);
  //           // throw err
  //         }
  //         return sponsor;
  //       }),
  //       mergeMap((params) => {
  //         this.sponsorId = params.id;

  //         return this.facade.joinSponsor(this.sponsorId).pipe(take(1));
  //       }),
  //       filter((sponsor) => typeof sponsor !== 'boolean'),
  //       mergeMap((sponsor) => {
  //         this.sponsor = sponsor as InternalSponsor;

  //         return this.socket.onConnect();
  //       }),
  //       tap(() => {
  //         this.facade.subscribeSponsor(this.sponsor);

  //         this.updateMessages$.next();
  //       }),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe();

  //   interval(5000)
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       filter(() => this.sponsor != null),
  //       mergeMap(() =>
  //         this.facade.getSponsor(this.sponsorId).pipe(take(1))
  //       ),
  //       tap(
  //         (sponsor) => (this.sponsor = sponsor as InternalSponsor),
  //         () => this.router.navigate(['/sponsors'])
  //       )
  //     )
  //     .subscribe();

  //   this.facade
  //     .onJoinEvent()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((user) => {
  //       this.sponsor.members.push(user);

  //       this.sponsor = this.facade.getSponsorWithSortedMembers(
  //         this.sponsor
  //       ) as InternalSponsor;
  //     });

  //   this.facade
  //     .onLeaveEvent()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((user) => {
  //       if (user._id === this.user?._id) {
  //         this.router.navigate(['/sponsors']);

  //         return;
  //       }

  //       remove(this.sponsor.members, (u) => u === user || u._id === user._id);
  //     });

  //   this.facade
  //     .onUpdateEvent()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((sponsor) => (this.sponsor = sponsor as InternalSponsor));

  //   this.facade
  //     .onDeleteEvent()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(() => this.router.navigate(['/sponsors']));

  //   this.authService.user$
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((user) => (this.user = user));
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
}
