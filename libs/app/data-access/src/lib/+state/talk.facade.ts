import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { TalkMapper } from '../mappers/talk.mapper';
import { TalkDataService } from '../infrastructure';
import { getYoutubeEmbedUrl } from '../utils';
import { BaseState } from './base.state';
import { Talk } from '../interfaces';

export type TalkWithSafeUrl = {
  [Key in keyof Talk]: Talk[Key];
} & { safeUrl: SafeUrl };

export interface TalkState {
  loading: boolean;
  talks: Talk[];
  talk?: TalkWithSafeUrl;
}

@Injectable()
export class TalkFacade extends BaseState<TalkState> {
  mapper = new TalkMapper();

  talks$ = this.select((state) => state.talks);

  talk$ = this.select((state) => state.talk);

  loading$ = this.select((state) => state.loading);

  constructor(
    private dataService: TalkDataService,
    private sanitizer: DomSanitizer
  ) {
    super({
      loading: false,
      talks: [],
    });
  }

  loadTalks() {
    this.setState({ loading: true });
    this.dataService
      .getTalks()
      .pipe(
        take(1),
        map((talks) => talks.map(this.mapper.mapTo))
      )
      .subscribe((talks) => {
        this.setState({ talks, loading: false });
      });
  }

  updateTalk(id: string, talk: Partial<Talk>) {
    this.setState({ loading: true });
    this.dataService
      .updateTalk(id, talk)
      .pipe(
        take(1),
        map((talk) => this.mapper.mapTo(talk))
      )
      .subscribe((response) => {
        const talk = this.getTalkWithSafeUrl(response);

        this.setState({ talk, loading: false });
      });
  }

  createTalk(talk: Omit<Talk, '_id'>) {
    this.setState({ loading: true });
    this.dataService
      .createTalk(talk)
      .pipe(take(1))
      .subscribe(() => {
        this.setState({ loading: false });
        this.loadTalks();
      });
  }

  loadTalk(id: string) {
    this.setState({ loading: true });
    this.dataService
      .getTalk(id)
      .pipe(
        take(1),
        map((talk) => this.mapper.mapTo(talk))
      )
      .subscribe((response) => {
        const talk = this.getTalkWithSafeUrl(response);

        this.setState({ talk, loading: false });
      });
  }

  private getTalkWithSafeUrl(talk: Talk): TalkWithSafeUrl {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      getYoutubeEmbedUrl(talk.ytid)
    );
    return { ...talk, safeUrl };
  }
}
