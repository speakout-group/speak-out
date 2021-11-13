export interface Talk {
  id: string;
  _id?: string;
  title: string;
  description: string;
  cover: string;
  name: string;
  photo: string;
  bio: string;
  start: Date | string;
  end: Date | string;
  group: string;
  stage: string;
  ytid: string;
}
