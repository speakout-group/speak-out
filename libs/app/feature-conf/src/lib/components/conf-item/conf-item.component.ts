// import { ConfirmDialogComponent } from '@speak-out/shared-ui-dialogs';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import {
  Conf,
  User,
  ConfService,
  updateItem,
} from '@speak-out/app-data-access';
import { take, tap } from 'rxjs/operators';
import { remove } from 'lodash';
import {
  ActionType,
  UpsertConfDialogComponent,
} from '../upsert-conf-dialog/upsert-conf-dialog.component';

@Component({
  selector: 'conf-item',
  templateUrl: './conf-item.component.html',
  styleUrls: ['./conf-item.component.scss'],
})
export class ConfItemComponent implements OnInit {
  @Input() conf!: Conf;
  @Input() user: User | null = null;
  @Input() publicConfs: Conf[] = [];
  @Input() userConfs: Conf[] = [];
  @Input() memberConfs: Conf[] = [];

  loading = false;
  isOwner = false;

  get isMember() {
    return this.memberConfs.some((e) => e._id === this.conf._id);
  }

  constructor(
    private confirmationService: ConfirmationService,
    private confService: ConfService,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private router: Router
  ) {}

  ngOnInit() {
    this.isOwner =
      this.conf.owner === this.user?._id ||
      (this.conf.owner as User)._id === this.user?._id;
  }

  openUpdateDialog() {
    const dialog = this.dialog.open(UpsertConfDialogComponent, {
      data: {
        type: ActionType.Update,
        conf: this.conf,
      },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((updatedConf: Conf) => {
        updateItem(
          this.publicConfs,
          (r) => r._id === this.conf._id,
          updatedConf
        );
        updateItem(
          this.memberConfs,
          (r) => r._id === this.conf._id,
          updatedConf
        );
        updateItem(this.userConfs, (r) => r._id === this.conf._id, updatedConf);
      });
  }

  confirmDelete() {
    // const dialog = this.dialog.open(ConfirmDialogComponent);
    const ref = this.confirmationService.open({})
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

    this.confService
      .deleteConf(this.conf)
      .pipe(take(1))
      .subscribe(() => {
        this.loading = false;

        remove(this.userConfs, (r) => r._id === this.conf._id);
        remove(this.publicConfs, (r) => r._id === this.conf._id);
        remove(this.memberConfs, (r) => r._id === this.conf._id);
      });
  }

  joinConf() {
    this.loading = true;

    const process = () => (this.loading = false);

    this.confService
      .getConf(this.conf._id)
      .pipe(take(1), tap(process, process))
      .subscribe(() => this.router.navigate(['/conf', this.conf._id]));
  }

  confirmLeaveConf() {
    // const dialog = this.dialog.open(ConfirmDialogComponent);
    const ref = this.confirmationService.open({});

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.leaveConf();
        }
      });
  }

  leaveConf() {
    this.loading = true;

    const process = () => (this.loading = false);

    this.confService
      .leaveConf(this.conf._id)
      .pipe(take(1), tap(process, process))
      .subscribe(() =>
        remove(this.memberConfs, (r) => r._id === this.conf._id)
      );
  }

  copyUrl() {
    this.clipboard.copy(`${window.location.origin}/conf/${this.conf._id}`);
  }

  isString<T>(value: T) {
    return typeof value === 'string';
  }
}
