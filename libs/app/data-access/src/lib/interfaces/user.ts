export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  online: boolean;
  isSocial: boolean;
}

export type UserInfo = Omit<User, 'password' | 'isSocial'>
