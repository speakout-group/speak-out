import { Pipe, PipeTransform } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';
import { betweenDates } from '../utilities';


@Pipe({ name: 'isLive' })
export class IsLivePipe implements PipeTransform {
  transform(value: Talk) {
    return betweenDates<Talk>(value);
  }
}
