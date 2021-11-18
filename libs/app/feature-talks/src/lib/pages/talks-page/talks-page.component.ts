import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  AuthFacade,
  TalkFacade,
  SidenavFacade,
} from '@speak-out/app-data-access';
import { CalendarEvent } from 'calendar-utils';
import { filter, takeUntil } from 'rxjs/operators';
import { zip, Subject } from 'rxjs';

@Component({
  templateUrl: './talks-page.component.html',
  styleUrls: ['./talks-page.component.scss'],
})
export class TalksPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  refresh = new Subject<void>();

  viewDate: Date = new Date('2021-11-18T00:00:00-03:00');

  events: CalendarEvent[] = [];

  constructor(
    readonly sidenav: SidenavFacade,
    readonly facade: TalkFacade,
    readonly auth: AuthFacade
  ) {}

  ngOnInit(): void {
    zip(this.auth.user$, this.facade.talks$)
      .pipe(
        takeUntil(this.destroy),
        filter(([user, talks]) => !!user && !!talks.length)
      )
      .subscribe(([user, talks]) => {
        this.events = talks.map(({ id, start, end, title, members }) => {
          console.log({ id, start, end, title, members })
          const event: CalendarEvent = { id, end: new Date(end), start: new Date(start), title };

          if (user && (members as string[]).includes(user._id)) {
            event.color = { primary: '#212121', secondary: '#ffEb3b' };
          }

          if (new Date() > start && new Date() < end) {
            event.color = { primary: '#212121', secondary: '#41ff2a' };
          }

          return event;
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
      this.sidenav.open();
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
