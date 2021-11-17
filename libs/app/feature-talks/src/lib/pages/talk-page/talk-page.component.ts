import { AuthFacade, SidenavFacade, TalkFacade } from '@speak-out/app-data-access';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './talk-page.component.html',
  styleUrls: ['./talk-page.component.scss'],
})
export class TalkPageComponent implements OnInit {
  constructor(
    readonly auth: AuthFacade,
    readonly facade: TalkFacade,
    readonly sidenav: SidenavFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.auth.loadUser();
    this.sidenav.close();
    this.loadTalk(this.route.snapshot);
    this.facade.talk$.subscribe(talk => {
      if (talk) {
        this.facade.subscribeTalk(talk.id);
        console.log('talk: ', talk)
      }
    });
  }

  loadTalk({ params }: ActivatedRouteSnapshot) {
    if (params.id) this.facade.loadTalk(params.id);
  }
}
