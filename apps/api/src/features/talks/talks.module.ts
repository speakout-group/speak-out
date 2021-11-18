import { Talk, TalkSchema } from './schema/talk.schema';
import { TalksController } from './controller/talks.controller';
import { SharedModule } from '../../shared/shared.module';
import { TalksService } from './service/talks.service';
import { TalksGateway } from './gateway/talks.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Talk.name,
        schema: TalkSchema,
      },
    ]),
    SharedModule
  ],
  controllers: [TalksController],
  providers: [TalksService, TalksGateway],
  exports: [TalksService, TalksGateway],
})
export class TalksModule {}
