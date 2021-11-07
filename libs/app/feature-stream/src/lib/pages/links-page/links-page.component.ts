import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Agenda, getOnlyLive, isLive, ScheduleFacade } from '@speak-out/app-data-access';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'speak-out-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class LinksPageComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private mql: () => void;

  constructor(
    private router: Router,
    readonly facade: ScheduleFacade,
    changeDetectorRef: ChangeDetectorRef,
    private _matStepperIntl: MatStepperIntl,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mql = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mql);
  }

  ngOnInit() {
    this.facade.loadSchedule();
  }

  onlyLive(agenda: Agenda) {
    return isLive(agenda)
  }

  watch(data: Agenda) {
    console.log(data);
    this.router.navigate(['/devparana', data.link])
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mql);
  }
}
