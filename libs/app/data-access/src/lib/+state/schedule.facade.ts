import { ScheduleDataService } from '../infrastructure';
import { Schedule, Agenda, Talk } from '../interfaces';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { forkJoin } from 'rxjs';

export interface ScheduleState {
  conf: string;
  loading: boolean;
  schedule: Schedule[];
  talks: Talk[];
  linkX: Agenda[];
  linkY: Agenda[];
  linkZ: Agenda[];
}

@Injectable({ providedIn: 'root' })
export class ScheduleFacade extends BaseState<ScheduleState> {
  loading$ = this.select((state) => state.loading);

  schedule$ = this.select((state) => state.schedule);

  linkX$ = this.select((state) => state.linkX);

  linkY$ = this.select((state) => state.linkY);

  linkZ$ = this.select((state) => state.linkZ);

  talks$ = this.select((state) => state.talks);

  conf$ = this.select((state) => state.conf);

  constructor(private dataService: ScheduleDataService) {
    super({
      conf: 'devprconf2021',
      loading: false,
      schedule: [],
      talks: [],
      linkX: [],
      linkY: [],
      linkZ: [],
    });
  }

  loadSchedule() {
    this.setState({ loading: true });
    const talks$ = this.dataService.getTalks();
    const schedule$ = this.dataService.getByConf(this.state.conf);

    forkJoin([talks$, schedule$]).subscribe(([talks, schedule]) => {
      const agenda: Agenda[] = schedule.map((item) => {
        const speaker = talks.find((talk) => talk.id == item.talk);
        return { ...item, speaker };
      });

      const linkX = agenda.filter((talk) => talk.link === 'X');
      const linkY = agenda.filter((talk) => talk.link === 'Y');
      const linkZ = agenda.filter((talk) => talk.link === 'Z');

      this.setState({ schedule, talks, linkX, linkY, linkZ });
      this.setState({ loading: false });
    });
  }

  loadTalks() {
    this.setState({ loading: true });
    this.dataService.getTalks().subscribe((data) => {
      this.setState({ talks: data });
      this.setState({ loading: false });
    });
  }
}
