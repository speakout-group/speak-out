import { Pipe, PipeTransform } from '@angular/core';
import { Talk } from '@speak-out/app-data-access';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  transform(talks: Record<string, any>[], key: string) {
    return talks.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key as string]] || []).push(x);
      return rv as Record<string, string>;
    }, {} as Record<string, string>);
  }
}
