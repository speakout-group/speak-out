import {
  User,
  Sponsor,
  AuthService,
  SponsorFacade,
} from '@speak-out/app-data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import {
  ActionType,
  JoinSponsorDialogComponent,
  UpsertSponsorDialogComponent,
} from '../../components';

@Component({
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.scss'],
})
export class SponsorsPageComponent implements OnInit, OnDestroy {
  publicSponsors: Sponsor[] = [];
  memberSponsors: Sponsor[] = [];
  user: User | null = null;
  userSponsors: Sponsor[] = [];

  loading = false;

  destroy$ = new Subject();

  constructor(
    readonly facade: SponsorFacade,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // this.facade.loadSponsors()
    // this.loading = true;

    // const process = () => (this.loading = false);

    // forkJoin({
    //   userSponsors: this.facade.getUserSponsors().pipe(take(1)),
    //   publicSponsors: this.facade.getPublicSponsors().pipe(take(1)),
    //   memberSponsors: this.facade.getSponsorsByMember().pipe(take(1)),
    // })
    //   .pipe(tap(process, process))
    //   .subscribe(({ userSponsors, publicSponsors, memberSponsors }) => {
    //     this.publicSponsors = publicSponsors;
    //     this.userSponsors = userSponsors;
    //     this.memberSponsors = memberSponsors;
    //   });

    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCreateDialog() {
    const dialog = this.dialog.open(UpsertSponsorDialogComponent, {
      data: {
        type: ActionType.Create,
      },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      // .subscribe((sponsor: Sponsor) => {
      //   if (sponsor.isPublic) {
      //     this.publicSponsors.push(sponsor);
      //   }

      //   this.userSponsors.push(sponsor);
      // });
  }

  openJoinSponsorDialog() {
    this.dialog.open(JoinSponsorDialogComponent);
  }
}
