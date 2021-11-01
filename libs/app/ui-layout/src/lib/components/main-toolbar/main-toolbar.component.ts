import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface UserLogged {
  username: string;
  email: string
}

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent{
  
  @Input() image = '';
  
  @Input() brand = '';

  @Input() user: UserLogged | null = null;

  @Output() nav = new EventEmitter<string[]>()
  
  @Output() logout = new EventEmitter<void>()
}
