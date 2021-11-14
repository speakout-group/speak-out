import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TalkWithSafeUrl } from '@speak-out/app-data-access';
import { Subject } from 'rxjs';

@Component({
  exportAs: 'talkView',
  selector: 'speak-out-talk-view',
  templateUrl: './talk-view.component.html',
  styleUrls: ['./talk-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalkViewComponent {
  @Output() cancel = new EventEmitter<void>();

  @Output() watch = new EventEmitter<TalkWithSafeUrl>();

  private _talk = new Subject<TalkWithSafeUrl>();
  readonly talk$ = this._talk.asObservable();

  setValue(value: TalkWithSafeUrl) {
    this._talk.next(value);
  }
}
