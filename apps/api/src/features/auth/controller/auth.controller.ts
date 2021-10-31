import {
  Get,
  Res,
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
import { FacebookAuthService } from 'facebook-auth-nestjs';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AuthService } from '../service/auth.service';
import { User } from '../../user/schema/user.schema';
import { authConfig } from '../config/auth.config';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Dictionary } from 'code-config';
import { Response } from 'express';
import { stringify } from 'qs';

@Controller('auth')
@ApiTags('conf')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private facebookService: FacebookAuthService,
    private googleService: GoogleAuthService,
    private subscriptionService: SubscriptionService
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(
      await this.authService.validate(body.username, body.password)
    );
  }

  @Post('facebook-login')
  async facebookLogin(@Body('accessToken') accessToken: string) {
    return this.authService.loginWithThirdParty('facebookId', () =>
      this.facebookService.getUser(
        accessToken,
        'id',
        'name',
        'email',
        'first_name',
        'last_name'
      )
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
      throw new BadRequestException('Username already exists');
    }

    if (await this.userService.getUserByEmail(body.email)) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.userService.create(body);

    return this.authService.login(user);
  }

  @Post('apple-callback')
  appleCallback(@Body() body: Dictionary, @Res() res: Response) {
    const uri = `intent://callback?${stringify(body)}#Intent;package=${
      authConfig.apple.android.packageId
    };scheme=signinwithapple;end`;

    return res.redirect(uri);
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
