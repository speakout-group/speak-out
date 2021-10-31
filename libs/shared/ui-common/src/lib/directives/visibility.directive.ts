import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[uiVisibility]',
})
export class VisibilityDirective {
  @Input() uiVisibility: boolean | null = false;

  @HostBinding('class')
  get visibilityClass() {
    return this.uiVisibility ? 'visible' : 'hidden';
  }
}
