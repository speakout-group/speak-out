import { ParseObjectIdPipe } from '../../../shared/pipe/parse-object-id.pipe';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TalksService } from '../service/talks.service';
import { CreateTalkDto } from '../dto/create-talk.dto';
import { UpdateTalkDto } from '../dto/update-talk.dto';
import { User } from '../../user/schema/user.schema';
import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';


@Controller('talks')
@ApiTags('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talksService.create(createTalkDto);
  }

  @Get()
  findAll() {
    return this.talksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talksService.getTalkById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateTalkDto
  ) {
    return this.talksService.update(
      await this.talksService.validateTalkById(id),
      body
    );
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async join(
    @Body('talkId', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.talksService.join(id, user);
  }

  @Delete('leave/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async leave(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.talksService.leave(
      user,
      await this.talksService.validateTalkById(id)
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.talksService.remove(id);
  }
}
