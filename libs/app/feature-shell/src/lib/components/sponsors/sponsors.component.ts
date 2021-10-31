import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shell-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorsComponent {
  sponsors = [
    { title: 'Ambev Tech', logo: 'assets/logos/ambev-tech.svg' },
    { title: 'Tecno Speed', logo: 'assets/logos/tecno-speed.svg' },
    { title: 'Ifood', logo: 'assets/logos/ifood.svg' },
    { title: 'Matera', logo: 'assets/logos/matera.svg'  }
  ]
}
