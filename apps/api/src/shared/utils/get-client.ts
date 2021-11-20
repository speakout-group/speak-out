import { ExecutionContext } from '@nestjs/common';
import { Dictionary } from 'code-config';
import { Sponsor } from '../../features/sponsors/schema/sponsor.schema';
import { Talk } from '../../features/talks/schema/talk.schema';
import { User } from '../../features/user/schema/user.schema';

export interface Client {
  headers: Dictionary<string>;
  user: User;
  sponsor?: Sponsor;
  talk?: Talk;
}

export const getClient = <T = Client>(ctx: ExecutionContext): T => {
  switch (ctx.getType()) {
    case 'ws':
      return ctx.switchToWs().getClient().handshake;
    case 'http':
      return ctx.switchToHttp().getRequest();
    default:
      return undefined;
  }
};
