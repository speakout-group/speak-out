import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './readme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadmeComponent {}
