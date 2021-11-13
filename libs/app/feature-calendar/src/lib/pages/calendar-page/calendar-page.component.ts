import { CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { TalkFacade } from '@speak-out/app-data-access';
import { CalendarSegmentClicked } from '../../+state';
import { CalendarEvent } from 'calendar-utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  @Input() view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date('11-20-2021');

  @Input() events: CalendarEvent[] = [];

  destroy = new Subject<void>();

  refresh = new Subject<void>();

  constructor(readonly facade: TalkFacade) {}

  ngOnInit(): void {
    this.facade.talks$.pipe(takeUntil(this.destroy)).subscribe((talks) => {
      this.events = talks.map((talk) => {
        return {
          start: new Date(talk.start),
          end: new Date(talk.end),
          title: talk.title,
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
    console.log(date);
    this.viewDate = date;
  }

  onEventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;

    const eventId = event.id;

    if (typeof eventId === 'string') {
      this.facade.updateTalk(eventId, { start: newStart, end: newEnd });
    }

    this.refresh.next();
  }

  onSegmentClicked(segment: CalendarSegmentClicked) {
    console.log(segment);
  }

  onEventClicked(event: CalendarEvent) {
    if (event.id) this.facade.loadTalk(event.id as string);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
