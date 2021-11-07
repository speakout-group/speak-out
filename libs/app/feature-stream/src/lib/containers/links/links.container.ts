import { AuthFacade, getOnlyLive, ScheduleFacade } from '@speak-out/app-data-access';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  templateUrl: './links.container.html',
  styleUrls: ['./links.container.scss']
})
export class LinksContainer {
  current$ = this.schedule.linkX$.pipe(
    map(getOnlyLive)
  )

  stream = {
    x$: this.schedule.linkX$.pipe(map(getOnlyLive)),
    y$: this.schedule.linkY$.pipe(map(getOnlyLive)),
    z$: this.schedule.linkZ$.pipe(map(getOnlyLive))
  }

  isHandset$ = this.bpObs.observe([
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait
  ]).pipe(map(state => state.matches))

  constructor(
    private bpObs: BreakpointObserver,
    readonly schedule: ScheduleFacade,
    readonly auth: AuthFacade,
    readonly router: Router,
  ) {
    this.schedule.loadLinks();
    this.auth.loadUser();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
