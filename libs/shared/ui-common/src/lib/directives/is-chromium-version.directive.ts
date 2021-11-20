import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[uiIsChromiumVersion]' })
export class IsChromiumVersionDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set uiIsChromiumVersion(version: number) {
    const regex = /Chrom(e|ium)\/([0-9]+)\./;
    const v = regex.exec(navigator.userAgent);
    const condition = (v && +v[2] === version);

    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
