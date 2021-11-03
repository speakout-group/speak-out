import { Talk } from './talk';

export interface Schedule {
  id: string;
  conf: string;
  start: string;
  end: string;
  speaker: string;
}

export interface Agenda extends Schedule {
  talk: Talk;
}
