import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Component({
  selector: 'speak-out-schedule-stepper',
  templateUrl: './schedule-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleStepperComponent {
  @Input() items: null | Talk[] = []
}
