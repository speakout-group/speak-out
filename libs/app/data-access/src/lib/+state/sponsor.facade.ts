import { SponsorDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { Sponsor } from '../interfaces';

export interface SponsorState {
  loading: boolean;
  publicSponsors: Sponsor[];
  memberSponsors: Sponsor[];
  userSponsors: Sponsor[];
  sponsor: Sponsor | null;
}

@Injectable()
export class SponsorFacade extends BaseState<SponsorState> {
  loading$ = this.select((state) => state.loading);

  publicSponsors$ = this.select((state) => state.publicSponsors);
  memberSponsors$ = this.select((state) => state.memberSponsors);
  userSponsors$ = this.select((state) => state.userSponsors);
  sponsor$ = this.select((state) => state.sponsor);

  constructor(private service: SponsorDataService) {
    super({
      loading: false,
      publicSponsors: [],
      memberSponsors: [],
      userSponsors: [],
      sponsor: null,
    });
  }

  createSponsor(sponsor: Partial<Sponsor>) {
    this.setState({ loading: true });
    this.service.createSponsor(sponsor).subscribe((sponsor) => {
      this.setState({
        userSponsors: [...this.state.userSponsors, sponsor],
      });
      this.setState({ loading: false });
    });
  }

  loadUserSponsors() {
    this.setState({ loading: true });
    this.service.getUserSponsors().subscribe((userSponsors) => {
      this.setState({ userSponsors });
      this.setState({ loading: false });
    });
  }

  loadPublicSponsors() {
    this.setState({ loading: true });
    this.service.getPublicSponsors().subscribe((publicSponsors) => {
      this.setState({ publicSponsors });
      this.setState({ loading: false });
    });
  }

  loadMemberSponsors() {
    this.setState({ loading: true });
    this.service.getSponsorsByMember().subscribe((memberSponsors) => {
      this.setState({ memberSponsors });
      this.setState({ loading: false });
    });
  }

  // loadSponsors() {
  //   this.setState({ loading: true });
  //   this.service.getPublicSponsors().subscribe((sponsors) => {
  //     this.setState({ sponsors });
  //     this.setState({ loading: false });
  //   });
  // }

  loadSponsor(id: string) {
    this.setState({ loading: true });
    this.service.getSponsor(id).subscribe((sponsor) => {
      this.setState({ sponsor });
      this.setState({ loading: false });
    });
  }

  updateSponsor(id: string, sponsor: Sponsor) {
    this.setState({ loading: true });
    this.service.updateSponsor(id, sponsor).subscribe((sponsor) => {
      this.setState({ sponsor });
      this.setState({ loading: false });
    });
  }

  deleteSponsor(id: string) {
    this.setState({ loading: true });
    this.service.getSponsor(id).subscribe((sponsor) => {
      this.setState({ sponsor });
      this.setState({ loading: false });
    });
  }

  leaveSponsor(id: string) {
    this.setState({ loading: true });
    this.service.leaveSponsor(id).subscribe((sponsor) => {
      this.setState({ sponsor });
      this.setState({ loading: false });
    });
  }

  subscribeSponsor(sponsor: Sponsor) {
    this.service.subscribeSponsor(sponsor);
  }

  joinSponsor(sponsorId: string) {
    this.setState({ loading: true });
    this.service.joinSponsor(sponsorId).subscribe((sponsor) => {
      this.setState({ sponsor });
      this.setState({ loading: false });
    });
  }
}
