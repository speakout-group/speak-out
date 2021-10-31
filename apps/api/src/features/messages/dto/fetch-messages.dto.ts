import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FetchMessagesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    required: false
  })
  limit = 30;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    required: false
  })
  before: Date;
}
