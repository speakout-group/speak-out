import { CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { TalkFacade } from '@speak-out/app-data-access';
import { CalendarEvent } from 'calendar-utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  refresh = new Subject<void>();

  viewDate: Date = new Date('2021-11-20T00:00:00-03:00');

  events: CalendarEvent[] = [];

  constructor(readonly facade: TalkFacade) {}

  ngOnInit(): void {
    this.facade.talks$.pipe(takeUntil(this.destroy)).subscribe((talks) => {
      this.events = talks.map(({ id, start, end, group, title }) => {
        return {
          id,
          end,
          start,
          title: `${group} - ${title}`,
          draggable: true,
          resizable: {
            afterEnd: true,
          },
        };
      });

      this.refresh.next();
    });
  }

  onViewDateChange(date: Date) {
    this.viewDate = date;
  }

  onEventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;

    if (typeof event.id === 'string') {
      this.facade.updateTalk(event.id, { start: newStart, end: newEnd });
    }

    this.refresh.next();
  }

  onEventClicked(event: CalendarEvent) {
    if (event.id) this.facade.loadTalk(event.id as string);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
