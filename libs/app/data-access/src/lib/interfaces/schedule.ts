import { Talk } from './talk';

export interface Schedule {
  id: string;
  conf: string;
  start: string;
  end: string;
  link: string;
}

export interface Agenda extends Schedule {
  talk: Talk;
}
