import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SponsorFacade } from '@speak-out/app-data-access';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(readonly facade: SponsorFacade ) {

  }

  ngOnInit() {
    this.facade.loadSponsors();
  }
  
}
