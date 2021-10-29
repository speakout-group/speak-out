import {
  Body,
  Get,
  Post,
  Delete,
  UseGuards,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SubscriptionService } from '../service/subscription.service';
import { SubscriptionType } from '../schema/subscription.schema';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { User } from '../schema/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get()
  sendTestingNotification(@CurrentUser() user: User) {
    return this.subscriptionService.sendNotification(user, {
      notification: {
        title: 'Testing',
        body: 'Testing notification',
      },
    });
  }

  @Post('web')
  createWebSubscription(
    @Body('subscription') body: PushSubscriptionJSON,
    @CurrentUser() user: User
  ) {
    return this.createSubscription(
      user,
      SubscriptionType.Web,
      JSON.stringify(body)
    );
  }

  @Post('mobile')
  createMobileSubscription(
    @Body('subscription') body: string,
    @CurrentUser() user: User
  ) {
    return this.createSubscription(user, SubscriptionType.Mobile, body);
  }

  private async createSubscription(
    user: User,
    type: SubscriptionType,
    body: string
  ) {
    if (!body) {
      throw new BadRequestException('Corpo de assinatura vazio');
    }

    const subscription = await this.subscriptionService.get(user, type, body);

    return subscription || this.subscriptionService.create(user, type, body);
  }

  @Delete('web')
  deleteWebSubscription(
    @Body('subscription') body: PushSubscriptionJSON,
    @CurrentUser() user: User
  ) {
    return this.deleteSubscription(
      user,
      SubscriptionType.Web,
      JSON.stringify(body)
    );
  }

  @Delete('mobile')
  deleteMobileSubscription(
    @Body('subscription') body: string,
    @CurrentUser() user: User
  ) {
    return this.deleteSubscription(user, SubscriptionType.Mobile, body);
  }

  private async deleteSubscription(
    user: User,
    type: SubscriptionType,
    body: string
  ) {
    if (!body) {
      throw new BadRequestException('Corpo de assinatura vazio');
    }

    return this.subscriptionService.delete(user, type, body);
  }
}
