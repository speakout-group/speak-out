import { ParseObjectIdPipe } from '../../../shared/pipe/parse-object-id.pipe';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SponsorsService } from '../service/sponsors.service';
import { CreateSponsorDto } from '../dto/create-sponsor.dto';
import { UpdateSponsorDto } from '../dto/update-sponsor.dto';
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


@Controller('sponsors')
@ApiTags('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  create(@Body() createSponsorDto: CreateSponsorDto) {
    return this.sponsorsService.create(createSponsorDto);
  }

  @Get()
  findAll() {
    return this.sponsorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorsService.getSponsorById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateSponsorDto,
    @CurrentUser() user: User,
  ) {
    return this.sponsorsService.update(
      await this.sponsorsService.validateSponsorById(id),
      body,
      user
    );
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async join(
    @Body('sponsorId', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.sponsorsService.join(id, user);
  }

  @Delete('leave/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async leave(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    console.log(id, user);
    
    return this.sponsorsService.leave(
      user,
      await this.sponsorsService.validateSponsorById(id)
    );
  }

  
  @Get('member')
  getSponsorsByMember(@CurrentUser() user: User) {
    return this.sponsorsService.getSponsorsByMember(user);
  }


  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  // remove(@Param('id') id: string) {
  //   return this.sponsorsService.remove(id);
  // }
}
