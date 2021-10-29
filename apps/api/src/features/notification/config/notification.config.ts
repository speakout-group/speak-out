import { PATHS } from '../../../shared/constants/paths';
import { ConfigFactory } from 'code-config';
import { join } from 'path';

const defaultValue = {
  vapid: {
    subject: 'mailto:contact@speakout.group',
    privateKey: '',
    publicKey: '',
  },
};

export const notificationConfig = ConfigFactory.getConfig(
  join(PATHS.config, 'notification.config.json'),
  defaultValue
);

notificationConfig.initPrettify();
