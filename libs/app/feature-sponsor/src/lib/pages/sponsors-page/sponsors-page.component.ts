import { SponsorFacade } from '@speak-out/app-data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
  loading = false;

  destroy$ = new Subject();

  constructor(
    readonly facade: SponsorFacade,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.facade.loadPublicSponsors();
    this.facade.loadMemberSponsors();
    this.facade.loadUserSponsors();
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

    dialog.afterClosed().pipe(take(1));
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
