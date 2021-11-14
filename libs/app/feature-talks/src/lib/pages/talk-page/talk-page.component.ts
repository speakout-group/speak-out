import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthFacade, TalkFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './talk-page.component.html',
  styleUrls: ['./talk-page.component.scss'],
})
export class TalkPageComponent implements OnInit {
  constructor(
    readonly auth: AuthFacade,
    readonly facade: TalkFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.loadUser();
    this.loadTalk(this.route.snapshot);
  }

  loadTalk({ params }: ActivatedRouteSnapshot) {
    if (params.id) {
      this.facade.loadTalk(params.id);
    }
  }
}
