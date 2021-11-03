import { ScheduleFacade, Talk } from '@speak-out/app-data-access';
import { SpeakerComponent } from '../speaker/speaker.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shell-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss']
})
export class TalksComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    readonly facade: ScheduleFacade
  ) {

  }

  open(data: Talk) {
    this.dialog.open(SpeakerComponent, { data, maxWidth: '800px' })
  }

  ngOnInit() {
    this.facade.loadTalks()
  }
}
