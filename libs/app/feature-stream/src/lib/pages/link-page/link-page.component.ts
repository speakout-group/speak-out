import { ScheduleFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'speak-out-link-page',
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss']
})
export class LinkPageComponent implements OnInit {

  constructor(
    readonly schedule: ScheduleFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { ytid } = this.route.snapshot.params
    console.log(ytid);
  }

}
