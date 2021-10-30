import {
  Conf,
  User,
  AuthService,
  ConfFacade,
} from '@speak-out/app-data-access';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import {
  ActionType,
  JoinConfDialogComponent,
  UpsertConfDialogComponent,
} from '../../components';

@Component({
  templateUrl: './confs-page.component.html',
  styleUrls: ['./confs-page.component.scss'],
})
export class ConfsPageComponent implements OnInit {
  user: User | null = null;

  constructor(
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

  openJoinConfDialog() {
    this.dialog.open(JoinConfDialogComponent);
  }
}
