import { SecretsSchema } from './auth.config';

export const authConfigDefault: SecretsSchema = {
  facebook: {
    appId: 1234,
    appSecret: 'secret',
  },
  google: {
    appId: 1234,
    appSecret: 'secret',
  },
  apple: {
    ios: {
      clientId: 'com.code.auth',
      packageId: 'com.code.auth',
      redirectUri: 'https://speakout.group/',
    },
    android: {
      clientId: 'speakout.group',
      packageId: 'com.code.auth',
      redirectUri: 'https://speakout.group/api/auth/apple-callback',
    },
    web: {
      clientId: 'speakout.group',
      redirectUri: 'https://speakout.group/',
    },
    teamId: '',
    keyIdentifier: '',
  },
};
