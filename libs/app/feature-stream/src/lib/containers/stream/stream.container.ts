import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TalkFacade, AuthFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './stream.container.html',
  styleUrls: ['./stream.container.scss']
})
export class StreamContainer implements OnInit {
  streamUrl$ = new Subject()


  constructor(
    readonly facade: TalkFacade,
    private route: ActivatedRoute,
    readonly auth: AuthFacade,
  ) { }

  ngOnInit(): void {
    this.auth.loadUser();
    this.facade.loadTalks();
    this.loadLink(this.route.snapshot);
  }

  loadLink({ params }: ActivatedRouteSnapshot) {
    if (params.id) {
      this.facade.loadTalk(params.id);
    }
  }
}
