import { AuthFacade } from '@speak-out/app-data-access';
import { mainTransition } from './main-transition';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './main.container.html',
  animations: [mainTransition],
})
export class MainContainer implements OnInit {
  constructor(readonly auth: AuthFacade, private router: Router) {}

  ngOnInit(): void {
    this.auth.loadUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
