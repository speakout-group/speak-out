import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Agenda, Nulled } from '@speak-out/app-data-access';

@Component({
  selector: 'speak-out-schedule-toolbar-item, a[schedule-toolbar-item]',
  templateUrl: './schedule-toolbar-item.component.html',
  styleUrls: ['./schedule-toolbar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleToolbarItemComponent {
  @Input() item: Agenda | Nulled
}
