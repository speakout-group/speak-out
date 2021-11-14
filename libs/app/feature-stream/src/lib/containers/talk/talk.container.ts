import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TalkFacade } from '@speak-out/app-data-access';

@Component({
  templateUrl: './talk.container.html',
  styleUrls: ['./talk.container.scss']
})
export class TalkContainer implements OnInit {

  constructor(
    readonly route: ActivatedRoute,
    readonly facade: TalkFacade,
    readonly router: Router,
  ) { }

  ngOnInit(): void {
    const { paramMap } = this.route.snapshot;
    const id = paramMap.get('id');
    if (id) this.facade.loadTalk(id);
  }

}
