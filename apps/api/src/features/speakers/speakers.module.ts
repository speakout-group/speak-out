import { SpeakerService } from './service/speaker.service';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Speaker, SpeakerSchema } from './schema/speaker.schema';
import { AuthModule } from '../auth/auth.module';
import { ConfModule } from '../conf/conf.module';
import { SpeakerController } from './controller/speaker.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Speaker.name,
        schema: SpeakerSchema,
      },
    ]),
    AuthModule,
    ConfModule,
  ],
  controllers: [SpeakerController],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakersModule {}
