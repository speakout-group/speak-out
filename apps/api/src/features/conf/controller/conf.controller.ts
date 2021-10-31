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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConfService } from '../service/conf.service';
import { User } from '../../user/schema/user.schema';
import { ConfDto } from '../dto/conf.dto';

@UseGuards(JwtAuthGuard)
@Controller('conf')
@ApiTags('conf')
export class ConfController {
  constructor(private confService: ConfService) { }

  @Get()
  @ApiBearerAuth('access-token')
  getUserConfs(@CurrentUser() user: User) {
    return this.confService.getConfsByOwner(user);
  }

  @Get('id/:id')
  @ApiBearerAuth('access-token')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.confService.getConf(id);
  }

  @Get('public')
  @ApiBearerAuth('access-token')
  getPublicConfs() {
    return this.confService.getPublicConfs();
  }

  @Get('member')
  @ApiBearerAuth('access-token')
  getConfsByMember(@CurrentUser() user: User) {
    return this.confService.getConfsByMember(user);
  }

  @Get('sponsor/:id')
  @ApiBearerAuth('access-token')
  getConfsBySponsor(@Param('id', ParseObjectIdPipe) id: string) {
    return this.confService.getConfsBySponsor(id);
  }

  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
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
  @ApiBearerAuth('access-token')
  async create(@Body() conf: ConfDto, @CurrentUser() user: User) {
    return this.confService.create(conf, user);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
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
  @ApiBearerAuth('access-token')
  async join(
    @Body('confId', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.confService.join(id, user);
  }

  @Delete('leave/:id')
  @ApiBearerAuth('access-token')
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
