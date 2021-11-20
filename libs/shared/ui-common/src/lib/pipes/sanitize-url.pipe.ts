import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeUrl',
})
export class SanitizeUrlPipe implements PipeTransform {
  constructor(private sanintizer: DomSanitizer) {}

  transform(url?: string) {
    return url ? this.sanintizer.bypassSecurityTrustResourceUrl(url) : false;
  }
}
