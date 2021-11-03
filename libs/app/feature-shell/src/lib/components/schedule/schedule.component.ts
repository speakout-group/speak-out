import { Component, OnInit } from '@angular/core';
import { ScheduleFacade } from '@speak-out/app-data-access';

@Component({
  selector: 'shell-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  constructor(readonly facade: ScheduleFacade) {}

  ngOnInit() {
    this.facade.schedule$.subscribe(console.log)
    this.facade.loadSchedule()
  }
}
