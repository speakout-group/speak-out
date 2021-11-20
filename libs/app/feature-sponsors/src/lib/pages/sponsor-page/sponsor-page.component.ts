import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SponsorFacade } from '@speak-out/app-data-access';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './sponsor-page.component.html',
  styleUrls: ['./sponsor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorPageComponent implements OnInit {
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => matches ? 2 : 1)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    readonly facade: SponsorFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadSponsor(this.route.snapshot);
  }

  loadSponsor({ params }: ActivatedRouteSnapshot) {
    if (params.id) this.facade.loadSponsor(params.id);
  }
}
