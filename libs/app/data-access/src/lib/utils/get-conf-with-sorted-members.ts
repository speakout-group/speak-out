import { Conf, User, UserInfo } from '../interfaces';

export const getConfWithSortedMembers = (conf: Conf) => {
  conf.members = (conf.members as User[]).sort((a: UserInfo, b: UserInfo) =>
    a.online === b.online ? 0 : a.online ? -1 : b.online ? 1 : 0
  );

  return conf;
};
