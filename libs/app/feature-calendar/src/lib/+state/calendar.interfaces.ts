import { CalendarEventTimesChangedEventType } from 'angular-calendar';
import { CalendarEvent } from 'calendar-utils';

export interface CalendarSegmentClicked {
  date: Date;
  displayDate: Date;
  isStart: boolean;
}

export interface CalendarEventClicked {
  event: CalendarEvent;
  sourceEvent: {
    target: {
      offsetParent: HTMLElement;
    };
  };
}

export interface CalendarEventTimesChangedEvent {
  type: CalendarEventTimesChangedEventType;
  event: CalendarEvent;
  newStart: Date;
  newEnd?: Date;
  allDay?: boolean;
}
