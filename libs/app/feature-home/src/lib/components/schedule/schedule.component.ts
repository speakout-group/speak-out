import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ScheduleFacade, Talk } from '@speak-out/app-data-access';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { SpeakerComponent } from '../speaker/speaker.component';

@Component({
  selector: 'speak-out-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private dialog: MatDialog,
    // readonly facade: TalksFacade,
    readonly facade: ScheduleFacade,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit() {
    this.facade.loadSchedule();
  }

  open(data: Talk) {
    this.dialog.open(SpeakerComponent, { data, maxWidth: '800px' });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
