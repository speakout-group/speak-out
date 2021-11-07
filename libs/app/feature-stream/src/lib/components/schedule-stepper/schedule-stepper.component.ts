import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Agenda } from '@speak-out/app-data-access';

@Component({
  selector: 'speak-out-schedule-stepper',
  templateUrl: './schedule-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleStepperComponent {
  @Input() items: null | Agenda[] = []
}
