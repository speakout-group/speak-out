import { CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { TalkFacade } from '@speak-out/app-data-access';
import { CalendarEvent } from 'calendar-utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './talks-page.component.html',
  styleUrls: ['./talks-page.component.scss']
})
export class TalksPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  refresh = new Subject<void>();

  viewDate: Date = new Date('11-20-2021');

  events: CalendarEvent[] = [];

  constructor(readonly facade: TalkFacade) {}

  ngOnInit(): void {
    this.facade.talks$.pipe(takeUntil(this.destroy)).subscribe((talks) => {
      this.events = talks.map(({ id, start, end, title }) => {
        const event: CalendarEvent = { id, end, start, title }

        if (new Date() > start && new Date() < end) {
          event.color = { primary: '#212121', secondary: '#f1f1f1' }
        }

        return event
      });

      this.refresh.next();
    });
  }

  onViewDateChange(date: Date) {
    this.viewDate = date;
  }

  onEventClicked(event: CalendarEvent) {
    if (typeof event.id === 'string') {
      this.facade.loadTalk(event.id);
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
