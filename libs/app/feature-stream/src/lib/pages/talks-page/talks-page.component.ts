import { TalkFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './talks-page.component.html',
  styleUrls: ['./talks-page.component.scss'],
})
export class TalksPageComponent implements OnInit {
  constructor(readonly facade: TalkFacade) {}

  ngOnInit(): void {
    this.facade.loadTalks();
  }
}
