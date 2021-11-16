import { Pipe, PipeTransform } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Pipe({ name: 'isLive' })
export class IsLivePipe implements PipeTransform {
  transform(talk: Talk) {
    return new Date() > talk.start && new Date() < talk.end;
  }
}
