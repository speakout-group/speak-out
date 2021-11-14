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
  
  viewDate: Date = new Date('11-20-2021');

  events: CalendarEvent[] = [];

  constructor(readonly facade: TalkFacade) {}

  ngOnInit(): void {
    this.facade.talks$.pipe(takeUntil(this.destroy)).subscribe((talks) => {
      this.events = talks.map((talk) => {
        return {
          start: new Date(talk.start),
          end: new Date(talk.end),
          title: `${talk.group} - ${talk.title}`,
          draggable: true,
          resizable: {
            afterEnd: true,
          },
          id: talk._id,
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
