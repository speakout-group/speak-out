import { SponsorDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { Sponsor } from '../interfaces';

export interface SponsorState {
  loading: boolean;
  sponsors: Sponsor[];
}

@Injectable()
export class SponsorFacade extends BaseState<SponsorState> {
  loading$ = this.select((state) => state.loading)
  
  sponsors$ = this.select((state) => state.sponsors)

  constructor(private service: SponsorDataService) {
    super({
      loading: false,
      sponsors: [],
    });
  }

  loadSponsors() {
    this.setState({ loading: true });
    this.service.getPublicSponsors().subscribe((sponsors) => {
      this.setState({ sponsors });
      this.setState({ loading: false });
    });
  }
}
