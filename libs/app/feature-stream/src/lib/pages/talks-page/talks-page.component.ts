import { TalkFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'speak-out-talks-page',
  templateUrl: './talks-page.component.html',
  styleUrls: ['./talks-page.component.scss'],
})
export class TalksPageComponent implements OnInit {
  constructor(readonly facade: TalkFacade) {}

  ngOnInit(): void {
    this.facade.loadTalks();

    this.facade.talks$.subscribe((talks) => {
      console.log(JSON.stringify(talks));
      
      interval(1000)
        .pipe(take(talks.length))
        .subscribe((i) => {
          // const _id = talks[i]._id;
          // if (_id) {
          //   this.facade.updateTalk(_id, { ytid: 'CvJ6tBmCOlw' });
          // }
        });
    });
  }
}
