import { Sponsor, SponsorSchema } from './schema/sponsor.schema';
import { SponsorsController } from './controller/sponsors.controller';
import { SharedModule } from '../../shared/shared.module';
import { SponsorsService } from './service/sponsors.service';
import { SponsorsGateway } from './gateway/sponsors.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Sponsor.name,
        schema: SponsorSchema,
      },
    ]),
    SharedModule
  ],
  controllers: [SponsorsController],
  providers: [SponsorsService, SponsorsGateway],
  exports: [SponsorsService, SponsorsGateway],
})
export class SponsorsModule {}
