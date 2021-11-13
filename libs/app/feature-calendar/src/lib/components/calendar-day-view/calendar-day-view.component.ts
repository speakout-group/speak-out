import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CalendarSegmentClicked } from '../../+state';
import { CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'speak-out-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayViewComponent {
  @Input() viewDate: Date = new Date();
  @Input() startHour = 8;
  @Input() endHour = 20;
  @Input() events: CalendarEvent[] = [];
  @Input() refresh = new Subject<void>();

  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() segmentClicked = new EventEmitter<CalendarSegmentClicked>();
  @Output() eventTimesChanged =
    new EventEmitter<CalendarEventTimesChangedEvent>();

  onEventTimesChanged(data: CalendarEventTimesChangedEvent) {
    this.eventTimesChanged.emit(data);
  }

  onSegmentClicked(data: CalendarSegmentClicked) {
    this.segmentClicked.emit(data);
  }

  onEventClicked(data: CalendarEvent) {
    this.eventClicked.emit(data);
  }
}
