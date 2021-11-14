import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AwardFacade } from '@speak-out/app-data-access';

@Component({
  selector: 'shell-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SponsorsComponent implements OnInit {
  constructor(readonly facade: AwardFacade) {}

  sponsors = [
    { title: 'Ambev Tech', logo: 'assets/logos/ambev-tech.svg' },
    { title: 'Tecno Speed', logo: 'assets/logos/tecno-speed.svg' },
    { title: 'Ifood', logo: 'assets/logos/ifood.svg' },
    { title: 'Matera', logo: 'assets/logos/matera.svg' },
  ];

  ngOnInit() {
    this.facade.loadSupporters();
  }
}
