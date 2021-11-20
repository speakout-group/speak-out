import { SponsorFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.scss']
})
export class SponsorsPageComponent implements OnInit {
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => matches)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    readonly facade: SponsorFacade
  ) {
    
  }

  ngOnInit() {
    this.facade.loadSponsors();
  }
}
