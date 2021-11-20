import { DomSanitizer } from '@angular/platform-browser';
import { SponsorDataService } from '../infrastructure';
import { SponsorVM, SponsorRaw } from '../interfaces';
import { BaseState } from './base.state';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface SponsorState {
  loading: boolean;
  sponsors: SponsorVM[];
  sponsor: SponsorVM | null;
}

@Injectable()
export class SponsorFacade extends BaseState<SponsorState> {
  loading$ = this.select((state) => state.loading);

  sponsors$ = this.select((state) => state.sponsors);
  sponsor$ = this.select((state) => state.sponsor);

  constructor(
    private service: SponsorDataService,
    private sanitizer: DomSanitizer
  ) {
    super({
      loading: false,
      sponsors: [],
      sponsor: null,
    });
  }

  loadUserSponsors() {
    this.setState({ loading: true });
    this.service
      .getUserSponsors()
      .pipe(map((sponsors) => sponsors.map(this.mapTo)))
      .subscribe((sponsors) => {
        this.setState({ sponsors });
        this.setState({ loading: false });
      });
  }

  loadSponsors() {
    this.setState({ loading: true });
    this.service
      .getSponsors()
      .pipe(map((sponsors) => sponsors.map(this.mapTo)))
      .subscribe((sponsors) => {
        this.setState({ sponsors });
        this.setState({ loading: false });
      });
  }

  loadSponsor(id: string) {
    this.setState({ loading: true });
    this.service
      .getSponsor(id)
      .pipe(map(this.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  updateSponsor(id: string, sponsor: SponsorRaw) {
    this.setState({ loading: true });
    this.service
      .updateSponsor(id, sponsor)
      .pipe(map(this.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  deleteSponsor(id: string) {
    this.setState({ loading: true });
    this.service
      .getSponsor(id)
      .pipe(map(this.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  leaveSponsor(id: string) {
    this.setState({ loading: true });
    this.service
      .leaveSponsor(id)
      .pipe(map(this.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  subscribeSponsor(sponsor: SponsorRaw) {
    this.service.subscribeSponsor(sponsor);
  }

  joinSponsor(sponsorId: string) {
    this.setState({ loading: true });
    this.service
      .joinSponsor(sponsorId)
      .pipe(map(this.mapTo))
      .subscribe((sponsor) => {
        this.setState({ sponsor });
        this.setState({ loading: false });
      });
  }

  mapTo({ _id, calendlyUrl, formUrl, videoUrl, ...sponsor }: SponsorRaw) {
    return {
      ...sponsor,
      id: _id,
      calendlyUrl: this.sanitize(calendlyUrl),
      videoUrl: this.sanitize(videoUrl),
      formUrl: this.sanitize(formUrl),
    };
  }

  private sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
