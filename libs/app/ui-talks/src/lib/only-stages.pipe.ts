import { Pipe, PipeTransform } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Pipe({ name: 'onlyStages' })
export class OnlyStagesPipe implements PipeTransform {
  transform(value: Talk[] = [], stages: string[]): Talk[] {
    return value.filter((talk) => stages.includes(talk.stage));
  }
}
