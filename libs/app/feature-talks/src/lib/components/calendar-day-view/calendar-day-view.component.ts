import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CustomEventTitleFormatter } from './calendar-title-formatter';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'speak-out-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarDayViewComponent {
  @Input() viewDate: Date = new Date();
  @Input() startHour = 8;
  @Input() endHour = 20;
  @Input() events: CalendarEvent[] = [];
  @Input() refresh = new Subject<void>();

  @Output() eventClicked = new EventEmitter<CalendarEvent>();

  onEventClicked(data: CalendarEvent) {
    this.eventClicked.emit(data);
  }
}
