import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TalkDataService } from '../infrastructure';
import { Injectable } from '@angular/core';
import { Talk } from '../interfaces';
import { BaseState } from './base.state';

export type TalkWithSafeUrl = {
  [Key in keyof Talk]: Talk[Key];
} & { safeUrl: SafeUrl }

export interface TalkState {
  loading: boolean;
  talks: Talk[];
  talk?: TalkWithSafeUrl;
}

@Injectable()
export class TalkFacade extends BaseState<TalkState> {
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
    this.dataService.getTalks().subscribe((talks) => {
      this.setState({ talks, loading: false });
    });
  }

  updateTalk(id: string, talk: Partial<Talk>) {
    this.setState({ loading: true });
    this.dataService.updateTalk(id, talk).subscribe((response) => {

      const talk = this.getTalkWithSafeUrl(response);

      this.setState({ talk, loading: false });
    });
  }

  createTalk(talk: Omit<Talk, '_id'>) {
    this.setState({ loading: true });
    this.dataService.createTalk(talk).subscribe(() => {
      this.setState({ loading: false });
      this.loadTalks();
    });
  }

  loadTalk(id: string) {
    this.setState({ loading: true });
    this.dataService.getTalk(id).subscribe((response) => {

      const talk = this.getTalkWithSafeUrl(response);

      this.setState({ talk, loading: false });
    });
  }

  getTalkWithSafeUrl(talk: Talk): TalkWithSafeUrl {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(talk.ytid);
    return { ...talk, safeUrl }
  }
}
