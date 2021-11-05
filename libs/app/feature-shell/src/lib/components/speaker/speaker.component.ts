import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Talk } from '@speak-out/app-data-access';
import {
  Inject,
  OnInit,
  Component,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeakerComponent implements OnInit, OnDestroy {
  timeout = -1;

  constructor(
    readonly ref: MatDialogRef<SpeakerComponent>,
    readonly elRef: ElementRef<HTMLElement>,
    @Inject(MAT_DIALOG_DATA)
    readonly data: Talk
  ) { }

  ngOnInit() {
    this.timeout = setTimeout(() => {
      const el = this.elRef.nativeElement;
      const figure = el.querySelector('figure');
      figure?.scrollIntoView({ behavior: 'smooth' });
      clearTimeout(this.timeout);
    }, 10000);
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
