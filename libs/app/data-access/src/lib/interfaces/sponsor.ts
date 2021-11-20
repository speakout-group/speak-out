import { User } from './user';

export interface Sponsor {
  name: string;
  description: string;
  logo: string;
  slug: string;
  color: string;
  website: string;
  youtube: string;
  members: User[] | string[];
  owner: User | string;
}

export interface SponsorRaw extends Sponsor {
  _id: string;
  calendlyUrl: string;
  videoUrl: string;
  formUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SafeUrl {}

export interface SponsorVM extends Sponsor {
  id: string;
  calendlyUrl: SafeUrl;
  videoUrl: SafeUrl;
  formUrl: SafeUrl;
}
