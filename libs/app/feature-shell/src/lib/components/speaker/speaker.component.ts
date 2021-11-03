import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

export interface SpeakerData {
  photo: string;
  title: string;
  description: string;
  bio: string;
  name: string;
}


@Component({
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakerComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: SpeakerData
  ) { }
}
