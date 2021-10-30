import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationModule } from './notification/notification.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { RoomModule } from './room/room.module';
import { ConfModule } from './conf/conf.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoomModule,
    ConfModule,
    MessagesModule,
    NotificationModule,
    SponsorModule
  ],
  controllers: [],
  exports: [
    AuthModule,
    UserModule,
    RoomModule,
    MessagesModule,
    NotificationModule,
  ],
})
export class FeaturesModule {}
