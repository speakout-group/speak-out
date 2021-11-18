import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import {
  CalendarEventClicked,
  CalendarSegmentClicked,
  CalendarEventTimesChangedEvent,
} from '../../+state';

@Component({
  selector: 'speak-out-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarWeekViewComponent {
  @Input() viewDate: Date = new Date();
  @Input() startHour = 8;
  @Input() endHour = 20;

  @Input() events: CalendarEvent[] = [];
  @Input() refresh = new Subject<void>();

  @Output() segmentClicked = new EventEmitter();
  @Output() eventTimesChanged = new EventEmitter();
  @Output() eventClicked = new EventEmitter();

  onSegmentClicked(data: CalendarSegmentClicked, event: Event) {
    this.segmentClicked.emit({ data, target: event.target });
  }

  onEventClicked({ event, sourceEvent }: CalendarEventClicked) {
    this.eventClicked.emit({
      event,
      container: sourceEvent.target.offsetParent,
    });
  }
  onEventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.eventTimesChanged.emit({ event, newStart, newEnd });
    this.refresh.next();
  }
}
