import { ActionType, UpsertSponsorDialogComponent } from '../../components';
import { Sponsor, SponsorFacade } from '@speak-out/app-data-access';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.scss'],
})
export class SponsorsPageComponent implements OnInit, OnDestroy {
  loading = false;

  destroy$ = new Subject();

  constructor(
    private confirmation: ConfirmationService,
    readonly facade: SponsorFacade,
    private dialog: MatDialog
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

  joinSponsor(sponsor: Sponsor) {
    const data = {
      label: sponsor.name,
      icon: 'gift',
      message: `concorrer ao prêmio deste patrocinador?`,
      cancel: true,
    };

    const ref = this.confirmation.open({ data }).afterClosed();

    ref.pipe(take(1)).subscribe((response) => {
      if (response) this.facade.joinSponsor(sponsor._id);
    });
  }
}
