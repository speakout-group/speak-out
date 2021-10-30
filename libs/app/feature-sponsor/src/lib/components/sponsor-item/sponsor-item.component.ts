// import { ConfirmDialogComponent } from '@speak-out/shared-ui-dialogs';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import {
  User,
  Sponsor,
  updateItem,
  SponsorFacade,
} from '@speak-out/app-data-access';
import { take, tap } from 'rxjs/operators';
import { remove } from 'lodash';
import {
  ActionType,
  UpsertSponsorDialogComponent,
} from '../upsert-sponsor-dialog/upsert-sponsor-dialog.component';

@Component({
  selector: 'sponsor-item',
  templateUrl: './sponsor-item.component.html',
  styleUrls: ['./sponsor-item.component.scss'],
})
export class SponsorItemComponent implements OnInit {
  @Input() sponsor!: Sponsor;
  @Input() user!: User;
  @Input() publicSponsors: Sponsor[] = [];
  @Input() userSponsors: Sponsor[] = [];
  @Input() memberSponsors: Sponsor[] = [];

  loading = false;
  isOwner = false;

  get isMember() {
    return this.memberSponsors.some((e) => e._id === this.sponsor._id);
  }

  constructor(
    private confirmationService: ConfirmationService,
    private sponsorFacade: SponsorFacade,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private router: Router
  ) {}

  ngOnInit() {
    this.isOwner =
      this.sponsor.owner === this.user._id ||
      (this.sponsor.owner as User)._id === this.user._id;
  }

  openUpdateDialog() {
    const dialog = this.dialog.open(UpsertSponsorDialogComponent, {
      data: {
        type: ActionType.Update,
        sponsor: this.sponsor,
      },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((updatedSponsor: Sponsor) => {
        updateItem(
          this.publicSponsors,
          (r) => r._id === this.sponsor._id,
          updatedSponsor
        );
        updateItem(
          this.memberSponsors,
          (r) => r._id === this.sponsor._id,
          updatedSponsor
        );
        updateItem(
          this.userSponsors,
          (r) => r._id === this.sponsor._id,
          updatedSponsor
        );
      });
  }

  confirmDelete() {
    const ref = this.confirmationService.open({});
    // const dialog = this.dialog.open(ConfirmDialogComponent);

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.delete();
        }
      });
  }

  delete() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.sponsorFacade.deleteSponsor(this.sponsor._id);
    // .pipe(take(1))
    // .subscribe(() => {
    //   this.loading = false;

    //   remove(this.userSponsors, (r) => r._id === this.sponsor._id);
    //   remove(this.publicSponsors, (r) => r._id === this.sponsor._id);
    // remove(this.memberSponsors, (r) => r._id === this.sponsor._id);
    // });
  }

  joinSponsor() {
    this.loading = true;

    const process = () => (this.loading = false);

    this.sponsorFacade.loadSponsor(this.sponsor._id);
    // .pipe(take(1), tap(process, process))
    // .subscribe(() => this.router.navigate(['/sponsor', this.sponsor._id]));
  }

  confirmLeaveSponsor() {
    // const dialog = this.dialog.open(ConfirmDialogComponent);
    const ref = this.confirmationService.open({});

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.leaveSponsor();
        }
      });
  }

  leaveSponsor() {
    this.loading = true;

    const process = () => (this.loading = false);

    this.sponsorFacade.leaveSponsor(this.sponsor._id);
    // .pipe(take(1), tap(process, process))
    // .subscribe(() =>
    //   remove(this.memberSponsors, (r) => r._id === this.sponsor._id)
    // );
  }

  copyUrl() {
    this.clipboard.copy(
      `${window.location.origin}/sponsor/${this.sponsor._id}`
    );
  }

  isString<T>(value: T) {
    return typeof value === 'string';
  }
}
