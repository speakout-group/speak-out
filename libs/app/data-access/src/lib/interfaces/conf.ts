import { User } from './user';

export interface Conf {
  _id: string;
  title: string;
  isPublic: boolean;
  slug: string;
  members: User[] | string[];
  owner: User | string;
}
