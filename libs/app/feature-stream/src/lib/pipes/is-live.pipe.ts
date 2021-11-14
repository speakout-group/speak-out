import { Agenda, isLive } from '@speak-out/app-data-access';
import { Pipe, PipeTransform } from '@angular/core';

interface Dates {
  start: Date;
  end: Date;
}

const lt = (date: Date) => {
  return new Date(date) >= new Date();
};
const gt = (date: Date) => {
  return new Date(date) <= new Date();
};

// const betweenDates = <T extends Dates>({ start, end }: T) => {
//   const lt =  lt(end instanceof Date ? end : new Date(end))
//   const lg =  lt(end instanceof Date ? end : new Date(end))
  
// }

@Pipe({
  name: 'isLive',
})
export class IsLivePipe implements PipeTransform {
  transform(value: Agenda) {
    return isLive(value);
  }
}
