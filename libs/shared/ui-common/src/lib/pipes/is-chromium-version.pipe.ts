import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isChromiumVersion', pure: true })
export class IsChromiumVersionPipe implements PipeTransform {
  transform(version: number) {
    const regex = /Chrom(e|ium)\/([0-9]+)\./;
    const v = regex.exec(navigator.userAgent);
    return (v && +v[2] === version);
  }
}
