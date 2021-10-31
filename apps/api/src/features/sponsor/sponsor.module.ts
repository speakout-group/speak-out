import { SponsorService } from './service/sponsor.service';
import { SponsorController } from './controller/sponsor.controller';

import { SponsorGateway } from './gateway/sponsor.gateway';
import { MessagesModule } from '../messages/messages.module';
import { SharedModule } from '../../shared/shared.module';
import { Sponsor, SponsorSchema } from './schema/sponsor.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ConfModule } from '../conf/conf.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => ConfModule),
    forwardRef(() => MessagesModule),
    MongooseModule.forFeature([
      {
        name: Sponsor.name,
        schema: SponsorSchema,
      },
    ]),
    SharedModule,
  ],
  controllers: [SponsorController],
  providers: [SponsorService, SponsorGateway],
  exports: [SponsorService, SponsorGateway],
})
export class SponsorModule {}
