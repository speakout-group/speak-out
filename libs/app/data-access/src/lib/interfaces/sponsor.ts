import { User } from './user';

export interface Sponsor {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  slug: string;
  color: string;
  website: string;
  youtube: string;
  members: User[] | string[];
  owner: User | string;
}
