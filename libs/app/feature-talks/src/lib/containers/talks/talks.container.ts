import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { TalkFacade } from '@speak-out/app-data-access';
import { MatSidenav } from '@angular/material/sidenav';
import { TalkViewComponent } from '../../components';
import { MediaMatcher } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './talks.container.html',
  styleUrls: ['./talks.container.scss'],
})
export class TalksContainer implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('snav') snav!: MatSidenav;
  @ViewChild('talk') talk!: TalkViewComponent;

  destroy = new Subject<void>();

  private mql: () => void;

  mq: MediaQueryList;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    readonly facade: TalkFacade,
    media: MediaMatcher
  ) {
    this.mq = media.matchMedia('(max-width: 600px)');
    this.mql = () => changeDetectorRef.detectChanges();
    this.mq.addEventListener('change', this.mql);
  }

  ngOnInit() {
    this.facade.loadTalks();
  }

  ngAfterViewInit() {
    this.facade.talk$.pipe(takeUntil(this.destroy)).subscribe((talk) => {
      console.log(talk);
      if (talk) {
        this.talk.setValue(talk);

        if (!this.snav.opened) {
          this.snav.open();
        }
      }
    });
  }

  ngOnDestroy() {
    this.mq.removeEventListener('change', this.mql);
    this.destroy.next();
    this.destroy.complete();
  }
}
