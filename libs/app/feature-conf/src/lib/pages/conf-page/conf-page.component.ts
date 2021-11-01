import { Conf, User, ConfFacade } from '@speak-out/app-data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  ActionType,
  JoinConfDialogComponent,
  UpsertConfDialogComponent,
} from '../../components';

@Component({
  templateUrl: './conf-page.component.html',
  styleUrls: ['./conf-page.component.scss'],
})
export class ConfPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  constructor(
    readonly facade: ConfFacade,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    const { id } = this.route.snapshot.params;
    if (id) this.facade.loadConf(id);
  }

  /**
   * Dijkstra Stream
   * Ritchie Stream
   * Berners-Lee Stream
   */
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(({ id }) => {
      if (id) {
        this.facade.loadConf(id);
      } else {
        this.router.navigate(['/confs']);
      }
    });
  }

  openUpdateDialog(conf: Conf) {
    const data = { type: ActionType.Update, conf };
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

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
