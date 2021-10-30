import { WithMembers } from '../types/with-members';
import { User, UserInfo } from '../interfaces';

export const getEntityWithSortedMembers = <T extends WithMembers>(
  entity: T
) => {
  entity.members = (entity.members as User[]).sort((a: UserInfo, b: UserInfo) =>
    a.online === b.online ? 0 : a.online ? -1 : b.online ? 1 : 0
  );

  return entity;
};
