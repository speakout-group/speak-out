import { User } from './user';

export interface Conf {
  _id: string;
  title: string;
  isPublic: boolean;
  members: User[] | string[];
  owner: User | string;
}
