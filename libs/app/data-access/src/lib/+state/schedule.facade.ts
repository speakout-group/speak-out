import { Injectable } from '@angular/core';
import { ScheduleDataService } from '../infrastructure/schedule-data.service';
import { Schedule, Talk } from '../interfaces';
import { BaseState } from './base.state';

export interface ScheduleState {
  conf: string;
  loading: boolean;
  schedule: Schedule[];
  talks: Talk[];
}

@Injectable({ providedIn: 'root' })
export class ScheduleFacade extends BaseState<ScheduleState> {
  loading$ = this.select((state) => state.loading);

  schedule$ = this.select((state) => state.schedule);
  
  talks$ = this.select((state) => state.talks);
  
  conf$ = this.select((state) => state.conf);

  constructor(private dataService: ScheduleDataService) {
    super({
      conf: 'devprconf2021',
      loading: false,
      schedule: [],
      talks: [],
    });
  }

  loadSchedule() {
    this.setState({ loading: true });
    this.dataService.getByConf(this.state.conf).subscribe((data) => {
      this.setState({ schedule: data });
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

