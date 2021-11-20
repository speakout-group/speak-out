import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SponsorFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './sponsor-page.component.html',
  styleUrls: ['./sponsor-page.component.scss'],
})
export class SponsorPageComponent implements OnInit {
  
  constructor(
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
