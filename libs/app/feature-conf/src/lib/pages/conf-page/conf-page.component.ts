import { Conf, User, ConfFacade } from '@speak-out/app-data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './conf-page.component.html',
  styleUrls: ['./conf-page.component.scss'],
})
export class ConfPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  constructor(
    readonly facade: ConfFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const { id } = this.route.snapshot.params;
    if (id) this.facade.loadConf(id);
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(({ id }) => {
      if (id) {
        this.facade.loadConf(id);
      } else {
        this.router.navigate(['/confs']);
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
