import { Nulled, TalkWithSafeUrl } from '@speak-out/app-data-access';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject } from 'rxjs';

interface User {
  _id: string
}
@Component({
  exportAs: 'talkView',
  selector: 'speak-out-talk-view',
  templateUrl: './talk-view.component.html',
  styleUrls: ['./talk-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TalkViewComponent {
  @Input() user: User | Nulled = null;

  @Output() cancel = new EventEmitter<void>();

  @Output() watch = new EventEmitter<TalkWithSafeUrl>();

  @Output() unwatch = new EventEmitter<TalkWithSafeUrl>();

  private _talk = new Subject<TalkWithSafeUrl>();
  readonly talk$ = this._talk.asObservable();

  setValue(value: TalkWithSafeUrl) {
    this._talk.next(value);
  }
}
