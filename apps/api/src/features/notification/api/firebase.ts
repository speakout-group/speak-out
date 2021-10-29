import { environments } from '../../../environments/environments';
import { credential, initializeApp, messaging } from 'firebase-admin';

initializeApp({
  credential: credential.cert(environments.firebaseConfig),
});

export const fcm = messaging();
