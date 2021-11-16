import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserLogged {
  username: string;
  email: string;
}

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
})
export class MainToolbarComponent {
  @Input() image = '';

  @Input() brand = '';

  @Input() shown: Observable<boolean> = of(true);
  
  @Input() hidden: boolean | null = false;

  @Input() user: UserLogged | null | undefined = null;

  @Output() nav = new EventEmitter<string[]>();

  @Output() logout = new EventEmitter<void>();
}
