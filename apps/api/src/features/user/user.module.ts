import { Subscription, SubscriptionSchema } from './schema/subscription.schema';
import { SubscriptionController } from './controller/subscription.controller';
import { NotificationModule } from '../notification/notification.module';
import { SettingsController } from './controller/settings.controller';
import { SubscriptionService } from './service/subscription.service';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';
import { UserGateway } from './gateway/user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  Module,
  forwardRef,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  SocketConnection,
  SocketConnectionSchema,
} from './schema/socket-connection.schema';
import { SocketConnectionService } from './service/socket-connection.service';
import { RecoverController } from './controller/recover.controller';
import { Recover, RecoverSchema } from './schema/recover.schema';
import { RecoverService } from './service/recover.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Recover.name,
        schema: RecoverSchema,
      },
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
      {
        name: SocketConnection.name,
        schema: SocketConnectionSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => NotificationModule),
  ],
  controllers: [
    UserController,
    SettingsController,
    SubscriptionController,
    RecoverController,
  ],
  providers: [
    UserService,
    UserGateway,
    SubscriptionService,
    SocketConnectionService,
    RecoverService,
  ],
  exports: [
    UserService,
    UserGateway,
    SubscriptionService,
    NotificationModule,
    SocketConnectionService,
  ],
})
export class UserModule implements OnModuleInit, OnModuleDestroy {
  constructor(private socketConnectionService: SocketConnectionService) {}

  onModuleInit() {
    return this.deleteConnections();
  }

  onModuleDestroy() {
    return this.deleteConnections();
  }

  private deleteConnections() {
    return this.socketConnectionService.deleteAllConnections();
  }
}
