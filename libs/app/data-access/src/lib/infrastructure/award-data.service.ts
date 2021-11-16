import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supporter } from '../interfaces';

@Injectable()
export class AwardDataService {
  constructor(private http: HttpClient) {}

  getSupporters() {
    return this.http.get<Supporter[]>('assets/data/supporters.json');
  }
}
