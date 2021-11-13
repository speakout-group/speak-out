import { ParseObjectIdPipe } from '../../../shared/pipe/parse-object-id.pipe';
import { TalksService } from '../service/talks.service';
import { CreateTalkDto } from '../dto/create-talk.dto';
import { UpdateTalkDto } from '../dto/update-talk.dto';
import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Post()
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
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateTalkDto
  ) {
    return this.talksService.update(
      await this.talksService.validateTalkById(id),
      body
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talksService.remove(id);
  }
}
