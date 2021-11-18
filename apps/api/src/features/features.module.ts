import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationModule } from './notification/notification.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { SpeakersModule } from './speakers/speakers.module';
import { RoomModule } from './room/room.module';
import { ConfModule } from './conf/conf.module';
import { UserModule } from './user/user.module';
import { TalksModule } from './talks/talks.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    // RoomModule,
    // ConfModule,
    // MessagesModule,
    // NotificationModule,
    SponsorModule,
    // SpeakersModule,
    TalksModule,
  ],
  controllers: [],
  exports: [
    AuthModule,
    UserModule,
    // RoomModule,
    // MessagesModule,
    // NotificationModule,
  ],
})
export class FeaturesModule {}
