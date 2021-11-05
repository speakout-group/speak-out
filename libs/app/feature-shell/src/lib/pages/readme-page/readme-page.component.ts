import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.scss'],
})
export class ReadmePageComponent {
  constructor(readonly router: Router) {
    console.log(router);
    
  }
}
