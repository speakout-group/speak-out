import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CustomEventTitleFormatter } from './calendar-title-formatter';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { Nulled } from '@speak-out/app-data-access';
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
  @Input() endHour = 21;
  @Input() events: CalendarEvent[] = [];
  @Input() refresh = new Subject<void>();
  
  @Input() userId: string | Nulled;

  @Output() eventClicked = new EventEmitter<CalendarEvent>();

  onEventClicked(data: CalendarEvent) {
    this.eventClicked.emit(data);
  }
}
