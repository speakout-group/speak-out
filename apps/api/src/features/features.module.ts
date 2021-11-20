import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { UserModule } from './user/user.module';
import { TalksModule } from './talks/talks.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SponsorsModule,
    TalksModule,
  ],
  controllers: [],
  exports: [
    AuthModule,
    UserModule,
  ],
})
export class FeaturesModule {}
