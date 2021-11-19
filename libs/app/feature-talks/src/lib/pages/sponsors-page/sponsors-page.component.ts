import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AwardFacade } from '@speak-out/app-data-access';
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
    readonly facade: AwardFacade
  ) {
    
  }

  ngOnInit() {
    this.facade.loadSupporters();
  }
}
