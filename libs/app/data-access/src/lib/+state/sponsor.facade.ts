import { SponsorDataService } from '../infrastructure';
import { SponsorVM, SponsorRaw } from '../interfaces';
import { SponsorMapper } from '../mappers';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { map } from 'rxjs/operators';

export interface SponsorState {
  loading: boolean;
  sponsors: SponsorVM[];
  sponsor?: SponsorVM;
}

@Injectable()
export class SponsorFacade extends BaseState<SponsorState> {
  
  loading$ = this.select((state) => state.loading);

  sponsors$ = this.select((state) => state.sponsors);
  sponsor$ = this.select((state) => state.sponsor);

  constructor(
    private service: SponsorDataService,
    private mapper: SponsorMapper,
  ) {
    super({
      loading: false,
      sponsors: [],
    });
  }

  loadSponsors() {
    this.setState({ loading: true });
    this.service
      .getSponsors()
      .pipe(map((sponsors) => sponsors.map(this.mapper.mapTo)))
      .subscribe((sponsors) => {
        this.setState({ sponsors });
        this.setState({ loading: false });
      });
  }

  loadSponsor(id: string) {
    this.setState({ loading: true });
    this.service
      .getSponsor(id)
      .pipe(map(this.mapper.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  updateSponsor(id: string, sponsor: SponsorRaw) {
    this.setState({ loading: true });
    this.service
      .updateSponsor(id, sponsor)
      .pipe(map(this.mapper.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  deleteSponsor(id: string) {
    this.setState({ loading: true });
    this.service
      .getSponsor(id)
      .pipe(map(this.mapper.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  leaveSponsor(id: string) {
    this.setState({ loading: true });
    this.service
      .leaveSponsor(id)
      .pipe(map(this.mapper.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  // subscribeSponsor(sponsor: SponsorRaw) {
  //   this.service.subscribeSponsor(sponsor);
  // }

  joinSponsor(sponsorId: string) {
    this.setState({ loading: true });
    this.service
      .joinSponsor(sponsorId)
      .pipe(map(this.mapper.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }
}
