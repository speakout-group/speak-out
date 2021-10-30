import { slugify, Sponsor, SponsorFacade } from '@speak-out/app-data-access';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private confirmation: ConfirmationService,
    readonly facade: SponsorFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadUserSponsors()
  }

  update(sponsor: Sponsor) {
    // const slug = slugify(sponsor.name)
    // const logo = 'assets/logos/matera.svg'
    // this.facade.updateSponsor('617d252bb6f5659557b3e833', { ...sponsor, slug, logo })
  }

  onClick(sponsor: string) {
    this.confirmation.open({
      data: { label: 'Sorteio', message: sponsor },
    });
  }
}
