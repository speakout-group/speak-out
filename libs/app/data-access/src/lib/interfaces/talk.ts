import { User } from './user';

interface CommonTalk {
  title: string;
  description: string;
  cover: string;
  name: string;
  photo: string;
  bio: string;
  group: string;
  stage: string;
  ytid: string;
  members: User[] | string[];
}

export interface RawTalk extends CommonTalk {
  _id: string;
  start: string;
  end: string;
}

export interface Talk extends CommonTalk {
  id: string;
  start: Date;
  end: Date;
}
