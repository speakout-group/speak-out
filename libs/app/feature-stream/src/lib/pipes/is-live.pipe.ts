import { Agenda, isLive } from '@speak-out/app-data-access';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLive',
})
export class IsLivePipe implements PipeTransform {
  transform(value: Agenda) {
    return isLive(value);
  }
}
