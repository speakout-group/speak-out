import {
  Put,
  Body,
  UseGuards,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateEmailDto } from '../dto/update-email.dto';
import { UserService } from '../service/user.service';
import { User } from '../schema/user.schema';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private userService: UserService) {}

  @Put('username')
  async updateUsername(
    @CurrentUser() user: User,
    @Body('username') username: string
  ) {
    const usernameUser = await this.userService.getUserByName(username);

    if (usernameUser) {
      throw new BadRequestException('Nome de usuário já existe');
    }

    user.username = username;

    return user.save();
  }

  @Put('email')
  async updateEmail(@CurrentUser() user: User, @Body() body: UpdateEmailDto) {
    const emailUser = await this.userService.getUserByEmail(body.email);

    if (emailUser) {
      throw new BadRequestException('Endereço de email já existe');
    }

    user.email = body.email;

    return user.save();
  }

  @Put('password')
  async updatePassword(
    @CurrentUser() user: User,
    @Body() body: UpdatePasswordDto
  ) {
    if (
      !user.isSocial &&
      !(await user.validatePassword(body.currentPassword))
    ) {
      throw new BadRequestException('A senha atual incorreta');
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    if (await user.validatePassword(body.password)) {
      throw new BadRequestException('Não use sua senha atual');
    }

    user.password = body.password;

    return user.save();
  }
}
