import { Talk } from './talk';

export interface Schedule {
  id: string;
  label: string;
  conf: string;
  start: string;
  end: string;
  link: string;
  talk: string;
}

export interface Agenda extends Schedule {
  speaker?: Talk;
}
