import { User } from './user';

export interface Room {
  _id: string;
  title: string;
  isPublic: boolean;
  members: User[] | string[];
  owner: User | string;
}
