import { User } from './user';

export interface Conf {
  _id: string;
  title: string;
  description: string;
  slug: string;
  members: User[] | string[];
  owner: User | string;
  start: Date;
  end: Date;
  isPublic: boolean;
}
