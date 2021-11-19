import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'speak-out-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarNavComponent {
  @Output() viewDateChange = new EventEmitter<Date>();

  @Input() view: CalendarView = CalendarView.Day;

  @Input() viewDate: Date = new Date();

  nav(date: Date) {
    this.viewDate = date;
    this.viewDateChange.emit(date);
  }

  onToday(today = new Date()) {
    this.viewDate = today;
    this.viewDateChange.emit(today);
  }

  onBob(date = new Date('2021-11-18T00:00:00-03:00')) {
    this.viewDate = date;
    this.viewDateChange.emit(date);
  }

  onShow(date = new Date('2021-11-19T00:00:00-03:00')) {
    this.viewDate = date;
    this.viewDateChange.emit(date);
  }

  onConf(date = new Date('2021-11-20T00:00:00-03:00')) {
    this.viewDate = date;
    this.viewDateChange.emit(date);
  }
}
