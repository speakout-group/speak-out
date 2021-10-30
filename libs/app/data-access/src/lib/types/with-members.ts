import { User } from '../interfaces';

export type WithMembers<T = unknown> = T & {
  members: User[] | string[];
};
