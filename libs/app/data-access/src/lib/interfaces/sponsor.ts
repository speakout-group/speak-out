import { User } from './user';

export interface Sponsor {
  name: string;
  description: string;
  logo: string;
  website?: string;
  youtube?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  calendlyUrl?: string;
  videoUrl?: string;
  formUrl?: string;
  members: User[];
}

export interface SponsorRaw extends Sponsor {
  _id: string;
  calendlyUrl: string;
  videoUrl: string;
  formUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface SafeUrl {}

export interface SponsorVM extends Sponsor {
  id: string;
  calendlyUrl: string;
  videoUrl: string;
  formUrl: string;
}
