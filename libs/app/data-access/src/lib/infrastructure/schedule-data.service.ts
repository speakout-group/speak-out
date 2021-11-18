import { Talk, Link, Schedule } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ScheduleDataService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Schedule[]>('assets/data/schedule.json');
  }

  getTalks() {
    return this.http.get<Talk[]>('assets/data/talks.json');
  }

  getLinks() {
    return this.http.get<Link[]>('assets/data/links.json');
  }

  getByConf(confId: string) {
    return this.getAll().pipe(
      map((schedule) => schedule.filter((s) => s.conf === confId))
    );
  }

  getByLink(linkId: string) {
    return this.getAll().pipe(
      map((schedule) => schedule.filter((s) => s.link === linkId))
    );
  }
}
