import { User } from '../interfaces/user';

export type Login = Pick<User, 'username' | 'password'>;

export type Subscribe = Pick<User, 'username' | 'password' | 'email'> & {
  terms: boolean;
  privacy: boolean;
};
