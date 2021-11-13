import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'speak-out-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarNavComponent {
  @Input() view: 'month' | 'week' | 'day' = 'week';

  @Input() viewDate: Date = new Date();

  @Output() viewDateChange = new EventEmitter<Date>();

  nav(date: Date) {
    this.viewDate = date;
    this.viewDateChange.emit(date);
  }
  onToday(today = new Date()) {
    this.viewDate = today;
    this.viewDateChange.emit(today);
  }
}
