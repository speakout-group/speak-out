import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthFacade } from '@speak-out/app-data-access';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './talks.container.html',
  styleUrls: ['./talks.container.scss']
})
export class TalksContainer {

  isHandset$ = this.bpObs.observe([
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait
  ]).pipe(map(state => state.matches))

  constructor(
    private bpObs: BreakpointObserver,
    readonly auth: AuthFacade,
    readonly router: Router,
  ) {
    this.auth.loadUser();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
