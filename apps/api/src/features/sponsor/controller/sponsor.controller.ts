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

@UseGuards(JwtAuthGuard)
@Controller('sponsor')
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Get()
  getUserSponsors(@CurrentUser() user: User) {
    return this.sponsorService.getSponsorsByOwner(user);
  }

  @Get('id/:id')
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.sponsorService.getSponsor(id);
  }

  @Get('public')
  getPublicSponsors() {
    return this.sponsorService.getPublicSponsors();
  }

  @Get('member')
  getSponsorsByMember(@CurrentUser() user: User) {
    return this.sponsorService.getSponsorsByMember(user);
  }

  @Delete('delete/:id')
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
  async create(@Body() sponsor: SponsorDto, @CurrentUser() user: User) {
    return this.sponsorService.create(sponsor, user);
  }

  @Put(':id')
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
  async join(
    @Body('sponsorId', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return this.sponsorService.join(id, user);
  }

  @Delete('leave/:id')
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
