import { Talk, TalkSchema } from './schema/talk.schema';
import { TalksController } from './controller/talks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TalksService } from './service/talks.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Talk.name,
        schema: TalkSchema,
      },
    ]),
  ],
  controllers: [TalksController],
  providers: [TalksService],
  exports: [TalksService],
})
export class TalksModule {}
