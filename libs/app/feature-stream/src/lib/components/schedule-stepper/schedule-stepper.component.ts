import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Talk } from '@speak-out/app-data-access';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'speak-out-schedule-stepper',
  styleUrls: ['./schedule-stepper.component.scss'],
  templateUrl: './schedule-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ScheduleStepperComponent implements AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper

  @Input() items: null | Talk[] = []

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.stepper);
      console.log(this.stepper.steps);
      this.stepper.steps.map(item => {
        console.log(item);
        console.log(item.state);
        
      })
    }, 1000)
    
  }
}
