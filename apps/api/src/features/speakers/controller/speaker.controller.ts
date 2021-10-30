import {
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Controller,
  UnauthorizedException,
  Post,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ConfService } from '../../conf/service/conf.service';
import { UserService } from '../../user/service/user.service';
import { SpeakerService } from '../service/speaker.service';
import { User } from '../../user/schema/user.schema';
import { DeleteConfSpeakerDto, FetchSpeakersDto } from '../dto';

@UseGuards(JwtAuthGuard)
@Controller('speaker')
export class SpeakerController {
  constructor(
    private userService: UserService,
    private confService: ConfService,
    private speakerService: SpeakerService
  ) {}

  @Get('conf-next-speaker/:confId')
  async getFirstConfSpeaker(@Param('confId') confId: string) {
    return this.speakerService.getNextConfSpeakers(
      await this.confService.validateConf(confId)
    );
  }

  @Get('conf/:confId')
  async getConfSpeakers(
    @Param('confId') confId: string,
    @Query() query: FetchSpeakersDto
  ) {
    return this.speakerService.getConfSpeakers(
      await this.confService.validateConf(confId)
    );
  }

  // @Post('conf/:confId')
  // async createConfSpeakers(
  //   @Param('confId') confId: string,
  //   @Post() createSpeakerDto: FetchSpeakersDto
  // ) {
  //   return this.speakerService.createConfSpeaker(
  //     await this.confService.validateConf(confId),
  //     query.limit,
  //     query.before
  //   );
  // }

  @Delete('conf')
  async deleteConfSpeaker(
    @Body() body: DeleteConfSpeakerDto,
    @CurrentUser() user: User
  ) {
    const conf = await this.confService.validateConf(body.confId);

    const speaker = await this.speakerService.validateSpeaker(body.speakerId);

    if (conf.owner.id !== user.id && speaker.id !== user.id) {
      throw new UnauthorizedException('Você não é o dono da conf');
    }

    return this.speakerService.deleteConfSpeaker(conf, body.speakerId);
  }
}
