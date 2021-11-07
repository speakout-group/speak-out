import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'was'
})
export class WasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
