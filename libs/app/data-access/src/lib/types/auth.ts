import { User } from '../interfaces/user';

export type Login = Pick<User, 'username' | 'password'>;
