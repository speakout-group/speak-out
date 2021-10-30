import {
  Put,
  Body,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../../../shared/pipe/parse-object-id.pipe';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { User } from '../../user/schema/user.schema';
import { ConfService } from '../service/conf.service';
import { ConfDto } from '../dto/conf.dto';

@UseGuards(JwtAuthGuard)
@Controller('conf')
export class ConfController {
  constructor(private confService: ConfService) {}

  @Get()
  getUserConfs(@CurrentUser() user: User) {
    return this.confService.getConfsByOwner(user);
  }

  @Get('id/:id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.confService.getConf(id);
  }

  @Get('public')
  getPublicConfs() {
    return this.confService.getPublicConfs();
  }

  @Get('member')
  getConfsByMember(@CurrentUser() user: User) {
    return this.confService.getConfsByMember(user);
  }

  @Delete('delete/:id')
  async delete(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.confService.delete(
      await this.confService.validateConfByIdAndOwner(id, user),
      user
    );
  }

  @Post()
  async create(@Body() conf: ConfDto, @CurrentUser() user: User) {
    return this.confService.create(conf, user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: ConfDto,
    @CurrentUser() user: User
  ) {
    return this.confService.update(
      await this.confService.validateConfByIdAndOwner(id, user),
      body,
      user
    );
  }

  @Post('join')
  async join(
    @Body('confId', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.confService.join(id, user);
  }

  @Delete('leave/:id')
  async leave(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.confService.leave(
      user,
      await this.confService.validateConf(id)
    );
  }
}
