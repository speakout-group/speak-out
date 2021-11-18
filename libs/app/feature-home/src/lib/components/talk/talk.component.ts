import {
  Input,
  Output,
  Component,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Component({
  selector: 'speak-out-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent {
  @Input() talk: Talk | null = null;

  @HostBinding('attr.class')
  flexSize = 'flex-2';

  @Output() openTalk = new EventEmitter<Talk>();
}
