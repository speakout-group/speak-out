import { User } from './user';

export interface Message {
  _id: string;
  message: string;
  to: string;
  room?: string;
  from?: User;
  createdAt?: string;
}

export enum MessageType {
  Direct = 'direct',
  Room = 'room',
}

export interface LocalMessage extends Message {
  createdAtDate: Date;
}
