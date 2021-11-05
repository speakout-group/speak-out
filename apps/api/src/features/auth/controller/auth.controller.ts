import {
  Get,
  Body,
  Post,
  Delete,
  UseGuards,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { SubscriptionService } from '../../user/service/subscription.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GoogleAuthService } from '../service/google-auth.service';
import { UserService } from '../../user/service/user.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AuthService } from '../service/auth.service';
import { User } from '../../user/schema/user.schema';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('conf')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private googleService: GoogleAuthService,
    private subscriptionService: SubscriptionService
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(
      await this.authService.validate(body.username, body.password)
    );
  }

  @Post('google-login')
  async googleLogin(@Body('accessToken') accessToken: string) {
    return this.authService.loginWithThirdParty('googleId', () =>
      this.googleService.getUser(accessToken)
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.loginWithRefreshToken(refreshToken);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (await this.userService.getUserByName(body.username)) {
      throw new BadRequestException('Este usuário já está sendo usado');
    }

    if (await this.userService.getUserByEmail(body.email)) {
      throw new BadRequestException('Este email já está sendo usado');
    }

    const user = await this.userService.create(body);

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout-from-all-devices')
  async logoutFromAllDevices(@CurrentUser() user: User) {
    user.generateSessionToken();

    await user.save();

    await this.subscriptionService.deleteAll(user);

    return this.authService.login(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return this.userService.filterUser(user, ['email']);
  }
}
