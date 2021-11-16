import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthFacade, TalkFacade } from '@speak-out/app-data-access';
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

  onNavigate(route: string[]) {
    console.log(route);
  }

  onLogout() {
    this.auth.logout();
    console.log('logout');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.mq.removeEventListener('change', this.mql);
    this.destroy.next();
    this.destroy.complete();
  }
}
