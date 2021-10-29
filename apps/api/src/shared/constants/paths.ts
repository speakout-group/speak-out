import { join } from 'path';

console.log(join(__dirname, '../../config/'))

export const PATHS = {
  config: join(__dirname, '../../../../../config/'),
  secrets: join(__dirname, '../../../../../secrets/'),
};
