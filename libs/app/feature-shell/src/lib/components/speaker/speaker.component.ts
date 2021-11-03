import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';

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
  readonly subject = new Subject<SpeakerData>()

  constructor(
    readonly ref: MatDialogRef<SpeakerComponent>,
    @Inject(MAT_DIALOG_DATA)
    readonly data: SpeakerData
  ) {
    this.subject.next(data)
  }
}
