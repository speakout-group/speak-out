import { ScheduleDataService } from '../infrastructure';
import { Schedule, Agenda, Talk, Link } from '../interfaces';
import { Injectable } from '@angular/core';
import { getOnlyLive } from '../utils';
import { BaseState } from './base.state';
import { forkJoin, interval } from 'rxjs';
import { timeInterval, timeout } from 'rxjs/operators';

// const seconds = interval(1000);

// seconds.pipe(timeInterval())
//   .subscribe(
//     value => console.log(value),
//     err => console.log(err),
//   );

// seconds.pipe(timeout(900))
//   .subscribe(
//     value => console.log(value),
//     err => console.log(err),
//   );

export interface ScheduleState {
  conf: string;
  loading: boolean;
  schedule: Schedule[];
  talks: Talk[];
  links: Link[];
  linkX: Agenda[];
  linkY: Agenda[];
  linkZ: Agenda[];
  link: Agenda[];
}

@Injectable({ providedIn: 'root' })
export class ScheduleFacade extends BaseState<ScheduleState> {
  loading$ = this.select((state) => state.loading);

  schedule$ = this.select((state) => state.schedule);

  link$ = this.select((state) => getOnlyLive(state.link));

  stream$ = this.select((state) => state.link);

  linkX$ = this.select((state) => state.linkX);

  linkY$ = this.select((state) => state.linkY);

  linkZ$ = this.select((state) => state.linkZ);

  talks$ = this.select((state) => state.talks);

  links$ = this.select((state) => state.links);

  conf$ = this.select((state) => state.conf);

  constructor(private dataService: ScheduleDataService) {
    super({
      conf: 'devprconf2021',
      loading: false,
      schedule: [],
      links: [],
      talks: [],
      linkX: [],
      linkY: [],
      linkZ: [],
      link: [],
    });
  }

  loadSchedule() {
    this.setState({ loading: true });
    const links$ = this.dataService.getLinks();
    const talks$ = this.dataService.getTalks();
    const schedule$ = this.dataService.getByConf(this.state.conf);

    forkJoin([talks$, links$, schedule$]).subscribe(
      ([talks, links, schedule]) => {
        const agenda: Agenda[] = schedule.map((item) => {
          const speaker = talks.find((talk) => talk.id == item.talk);
          const { ytid } = links.find((link) => link.id == item.link) ?? {};
          return { ...item, ytid, speaker };
        });

        const linkX = agenda.filter((talk) => talk.link === 'X');
        const linkY = agenda.filter((talk) => talk.link === 'Y');
        const linkZ = agenda.filter((talk) => talk.link === 'Z');

        this.setState({ schedule, talks, links, linkX, linkY, linkZ });
        this.setState({ loading: false });
      }
    );
  }

  loadTalks() {
    this.setState({ loading: true });
    this.dataService.getTalks().subscribe((data) => {
      this.setState({ talks: data });
      this.setState({ loading: false });
    });
  }

  loadLinks() {
    this.setState({ loading: true });
    this.dataService.getLinks().subscribe((data) => {
      this.setState({ links: data });
      this.setState({ loading: false });
    });
  }

  loadLink(linkId: string) {
    this.setState({ loading: true });
    const links$ = this.dataService.getLinks();
    const talks$ = this.dataService.getTalks();
    const schedule$ = this.dataService.getByLink(linkId);

    forkJoin([talks$, links$, schedule$]).subscribe(
      ([talks, links, schedule]) => {
        const agenda: Agenda[] = schedule.map((item) => {
          const speaker = talks.find((talk) => talk.id == item.talk);
          const { ytid } = links.find((link) => link.id == item.link) ?? {};
          return { ...item, ytid, speaker };
        });

        const link = agenda.filter((talk) => talk.link === linkId);

        this.setState({ schedule, talks, links, link, loading: false });
      }
    );
  }
}
