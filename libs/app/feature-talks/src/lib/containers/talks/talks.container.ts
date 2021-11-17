import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  TalkFacade,
  AuthFacade,
  SidenavFacade,
  Talk,
} from '@speak-out/app-data-access';
import { MatSidenav } from '@angular/material/sidenav';
import { TalkViewComponent } from '../../components';
import { MediaMatcher } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
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
    readonly sidenav: SidenavFacade,
    readonly facade: TalkFacade,
    readonly auth: AuthFacade,
    readonly router: Router,
    media: MediaMatcher
  ) {
    this.mq = media.matchMedia('(max-width: 600px)');
    this.mql = () => changeDetectorRef.detectChanges();
    this.mq.addEventListener('change', this.mql);
  }

  ngOnInit() {
    this.auth.loadUser();
    this.facade.loadTalks();
  }

  ngAfterViewInit() {
    this.snav.openedChange.pipe(takeUntil(this.destroy)).subscribe((opened) => {
      if (opened) this.sidenav.open();
      else this.sidenav.close();
    });

    this.sidenav.opened$.pipe(takeUntil(this.destroy)).subscribe((opened) => {
      if (opened && !this.snav.opened) this.snav.open();

      if (!opened && this.snav.opened) this.snav.close();
    });

    this.facade.talk$.pipe(takeUntil(this.destroy)).subscribe((talk) => {
      if (talk) this.talk.setValue(talk);
    });
  }


  watchTalk(talk: Talk) {
    this.facade.joinTalk(talk.id);
    this.auth.loadUser();
  }
  
  unWatchTalk(talk: Talk) {
    this.facade.leaveTalk(talk.id);
    this.auth.loadUser();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.mq.removeEventListener('change', this.mql);
    this.destroy.next();
    this.destroy.complete();
  }
}
