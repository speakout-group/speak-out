import { Environment } from './environment.type';
import { config } from 'dotenv';

config();

const env = process.env;

export const environments = {
  port: +(env.PORT || 3000),
  mongoUri: env.MONGO_URI,
  proxyEnabled: env.PROXY_ENABLED === 'true',
  frontEndUrl: env.FRONTEND_URL,
  firebaseConfig: JSON.parse(env.FIREBASE_CONFIG),
  accessTokenSecret: env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION,
  recoverCodeExpiration: +env.RECOVER_CODE_EXPIRATION,
  redis: {
    enabled: env.REDIS_ENABLED === 'true',
    host: env.REDIS_HOST,
    port: +env.REDIS_PORT,
  },
  vapid: {
    publicKey: env.VAPID_PUBLIC_KEY,
    privateKey: env.VAPID_PRIVATE_KEY,
    subject: env.VAPID_SUBJECT,
  },
};

export const environment: Environment = 'production';
