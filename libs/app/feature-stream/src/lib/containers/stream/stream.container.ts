import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ScheduleFacade, AuthFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './stream.container.html',
  styleUrls: ['./stream.container.scss']
})
export class StreamContainer implements OnInit {
  streamUrl$ = new Subject()


  constructor(
    readonly facade: ScheduleFacade,
    private route: ActivatedRoute,
    readonly auth: AuthFacade,
  ) { }

  ngOnInit(): void {
    this.auth.loadUser();
    this.facade.loadSchedule();
    this.loadLink(this.route.snapshot);
  }

  loadLink({ params }: ActivatedRouteSnapshot) {
    if (params.id) {
      this.facade.loadLink(params.id);
    }
  }
}
