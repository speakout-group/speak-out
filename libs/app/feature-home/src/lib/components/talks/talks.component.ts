import { SpeakerComponent } from '../speaker/speaker.component';
import { Talk, TalkFacade } from '@speak-out/app-data-access';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'speak-out-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss'],
})
export class TalksComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    readonly facade: TalkFacade,
  ) {}

  open(data: Talk) {
    this.dialog.open(SpeakerComponent, { data, maxWidth: '800px' });
  }

  ngOnInit() {
    this.facade.loadTalks();
  }
}
