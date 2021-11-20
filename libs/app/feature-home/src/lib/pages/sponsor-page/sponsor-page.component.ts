import { ActivatedRoute, Router } from '@angular/router';
import { AwardFacade, SponsorFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './sponsor-page.component.html',
  styleUrls: ['./sponsor-page.component.scss'],
})
export class SponsorPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    readonly sponsorFacade: SponsorFacade,
    readonly facade: AwardFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    if (!id) this.router.navigateByUrl('/');
    else this.facade.loadSupporter(id);
  }
}
