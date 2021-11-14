import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainer {
  constructor(private router: Router) {}
  onNavigate(route: string[]) {
    this.router.navigate(route);
  }
}
