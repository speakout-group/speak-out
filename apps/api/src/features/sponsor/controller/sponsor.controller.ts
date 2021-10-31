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
import { SponsorService } from '../service/sponsor.service';
import { SponsorDto } from '../dto/sponsor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('sponsor')
@ApiTags('sponsor')
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Get()
  @ApiBearerAuth('access-token')
  getUserSponsors(@CurrentUser() user: User) {
    return this.sponsorService.getSponsorsByOwner(user);
  }

  @Get('id/:id')
  @ApiBearerAuth('access-token')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.sponsorService.getSponsor(id);
  }

  @Get('public')
  getPublicSponsors() {
    return this.sponsorService.getPublicSponsors();
  }

  @Get('member')
  @ApiBearerAuth('access-token')
  getSponsorsByMember(@CurrentUser() user: User) {
    return this.sponsorService.getSponsorsByMember(user);
  }

  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  async delete(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.sponsorService.delete(
      await this.sponsorService.validateSponsorByIdAndOwner(id, user),
      user
    );
  }

  @Post()
  @ApiBearerAuth('access-token')
  async create(@Body() sponsor: SponsorDto, @CurrentUser() user: User) {
    return this.sponsorService.create(sponsor, user);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: SponsorDto,
    @CurrentUser() user: User
  ) {
    return this.sponsorService.update(
      await this.sponsorService.validateSponsorByIdAndOwner(id, user),
      body,
      user
    );
  }

  @Post('join')
  @ApiBearerAuth('access-token')
  async join(
    @Body('sponsorId', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.sponsorService.join(id, user);
  }

  @Delete('leave/:id')
  @ApiBearerAuth('access-token')
  async leave(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.sponsorService.leave(
      user,
      await this.sponsorService.validateSponsor(id)
    );
  }
}
