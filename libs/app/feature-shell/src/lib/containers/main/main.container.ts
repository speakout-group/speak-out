import { AuthFacade } from '@speak-out/app-data-access';
import { NavigationEnd, Router } from '@angular/router';
import { mainTransition } from './main-transition';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './main.container.html',
  animations: [mainTransition],
})
export class MainContainer implements OnInit {
  constructor(readonly auth: AuthFacade, private router: Router) {}

  ngOnInit(): void {
    // this.auth.loadUser();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url ? event.url : '/devparana';

        this.auth.setRedirect(url);
      }
    });
  }

  onNavigate(route: string[]) {
    this.router.navigate(route);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
