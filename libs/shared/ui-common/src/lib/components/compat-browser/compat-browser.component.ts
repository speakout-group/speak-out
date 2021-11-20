import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'ui-compat-browser',
  templateUrl: './compat-browser.component.html',
  styleUrls: ['./compat-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompatBrowserComponent {
  constructor(readonly platform: Platform) { }

}
