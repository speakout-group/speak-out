import { Conf } from './conf';

export interface Speaker {
  _id: string;
  name: string;
  bio: string;
  email: string;
  conf: Conf;
  order: number;
  start: Date;
  end: Date;
}
