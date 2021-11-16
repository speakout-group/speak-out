import { Pipe, PipeTransform } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Pipe({ name: 'onlyStage' })
export class OnlyStagePipe implements PipeTransform {
  transform(value: Talk[] = [], stage: string): Talk[] {
    return value.filter((talk) => talk.stage === stage);
  }
}
