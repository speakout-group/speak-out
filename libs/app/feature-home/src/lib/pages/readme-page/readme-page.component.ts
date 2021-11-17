import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmePageComponent {
  constructor(readonly router: Router) {}
}
