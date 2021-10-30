import { ConfService } from './service/conf.service';
import { ConfController } from './controller/conf.controller';

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conf, ConfSchema } from './schema/conf.schema';
import { AuthModule } from '../auth/auth.module';
import { ConfGateway } from './gateway/conf.gateway';
import { MessagesModule } from '../messages/messages.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => MessagesModule),
    MongooseModule.forFeature([
      {
        name: Conf.name,
        schema: ConfSchema,
      },
    ]),
    SharedModule,
  ],
  controllers: [ConfController],
  providers: [ConfService, ConfGateway],
  exports: [ConfService, ConfGateway],
})
export class ConfModule {}
