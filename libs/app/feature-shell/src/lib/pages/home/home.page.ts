import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { SponsorFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(
    private confirmation: ConfirmationService,
    readonly facade: SponsorFacade
  ) { }

  ngOnInit(): void {
    this.facade.loadSponsors()
  }

  onClick(sponsor: string) {
    this.confirmation.open({
      data: { label: 'Sorteio', message: sponsor }
    });
  }
}
