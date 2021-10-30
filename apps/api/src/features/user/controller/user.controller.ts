import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../../user/schema/user.schema';
import { SubscribeEventDto } from '../dto/subscribe-event.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.filterUser(
      await this.userService.validateUserByName(username)
    );
  }

  @Post('subscribe/:event')
  async subscribe(
    @CurrentUser() user: User,
    @Param('event') event: string,
    @Body() body: SubscribeEventDto
  ) {
    // const usernameUser = await this.userService.getUserByName(username);
    return this.userService.filterUser(
      await this.userService.validateUserByName(event)
    );
  }
}
