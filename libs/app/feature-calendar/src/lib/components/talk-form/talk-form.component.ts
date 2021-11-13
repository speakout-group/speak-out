import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Talk, TalkWithSafeUrl } from '@speak-out/app-data-access';
import { TalkForm } from './talk.form';

@Component({
  exportAs: 'talkForm',
  selector: 'speak-out-talk-form',
  templateUrl: './talk-form.component.html',
  styleUrls: ['./talk-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalkFormComponent {
  form = new TalkForm();

  @Output() cancel = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<Talk>();

  setValue(value: Talk | TalkWithSafeUrl) {
    this.form.populate(value);
  }
}
