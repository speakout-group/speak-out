import {
  Conf,
  User,
  AuthService,
  ConfFacade,
} from '@speak-out/app-data-access';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import {
  ActionType,
  JoinConfDialogComponent,
  UpsertConfDialogComponent,
} from '../../components';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './confs-page.component.html',
  styleUrls: ['./confs-page.component.scss'],
})
export class ConfsPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  user: User | null = null;

  constructor(
    private confirmation: ConfirmationService,
    private authService: AuthService,
    readonly facade: ConfFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.facade.loadUserConfs();
    this.facade.loadPublicConfs();
    this.facade.loadMemberConfs();

    this.authService.user$
      // .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  openCreateDialog() {
    const data = { type: ActionType.Create };
    const dialog = this.dialog.open(UpsertConfDialogComponent, { data });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((conf: Conf) => {
        if (conf.isPublic) {
          this.facade.loadPublicConfs();
          // this.publicConfs.push(conf);
        }

        this.facade.loadUserConfs();
        // this.userConfs.push(conf);
      });
  }

  joinConf(conf: Conf) {
    const data = {
      label: conf.title,
      icon: 'confirmation_number',
      message: `pegar seu ticket para este streaming?`,
      cancel: true,
    };

    const ref = this.confirmation.open({ data }).afterClosed();

    ref.pipe(takeUntil(this.destroy)).subscribe((response) => {
      if (response) this.facade.joinConf(conf._id);
    });
  }

  openJoinConfDialog() {
    this.dialog.open(JoinConfDialogComponent);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
