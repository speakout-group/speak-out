import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isPast' })
export class IsPastPipe implements PipeTransform {
  transform(endDate: Date): boolean {
    return endDate <= new Date();
  }
}
