import { Pipe, PipeTransform } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Pipe({ name: 'onlyLive' })
export class OnlyLivePipe implements PipeTransform {
  transform(value: Talk[]) {
    return value.filter((talk) => {
      return new Date() > talk.start && new Date() < talk.end;
    });
  }
}
