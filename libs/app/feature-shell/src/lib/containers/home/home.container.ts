import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './home.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainer {}
