import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private confirmation: ConfirmationService) { }

  ngOnInit(): void {
    console.log('oi');
  }

  onClick(sponsor: string) {
    this.confirmation.open({
      data: { label: 'Sorteio', message: sponsor }
    });
  }
}
