import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AwardDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { Supporter } from '../interfaces';
import { BaseState } from './base.state';

export type SupporterItem = Pick<Supporter, 'id' | 'name' | 'logo' | 'slug'>;

export interface AwardState {
  loading: boolean;
  supporters: SupporterItem[];
  supporter: Supporter | null;
  embedUrl: SafeUrl | null;
}

@Injectable()
export class AwardFacade extends BaseState<AwardState> {
  supporters$ = this.select((state) => state.supporters);

  supporter$ = this.select((state) => state.supporter);

  embedUrl$ = this.select((state) => state.embedUrl);

  loading$ = this.select((state) => state.loading);

  constructor(
    private dataService: AwardDataService,
    private sanitizer: DomSanitizer
  ) {
    super({
      loading: false,
      supporters: [],
      supporter: null,
      embedUrl: null,
    });
  }

  loadSupporters() {
    this.setState({ loading: true });
    this.dataService.getSupporters().subscribe((supporters) => {
      this.setState({ supporters, loading: false });
    });
  }

  loadSupporter(id: string) {
    this.setState({ loading: true });
    if (this.state.supporters.length > 0) {
      const supporter = this.state.supporters.find(
        (supporter) => supporter.id === id
      ) as Supporter;

      let embedUrl = null;

      if (supporter.embed) {
        embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          supporter.embed
        );
      }

      this.setState({ supporter, embedUrl, loading: false });
    } else {
      this.dataService.getSupporters().subscribe((supporters) => {
        const supporter = supporters.find(
          (supporter) => supporter.id === id
        ) as Supporter;

        let embedUrl = null;

        if (supporter.embed) {
          embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            supporter.embed
          );
        }

        this.setState({ supporter, embedUrl, loading: false });
      });
    }
  }
}
