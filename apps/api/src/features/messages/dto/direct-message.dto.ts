import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MaxLength } from 'class-validator';

export class DirectMessageDto {
  @IsString()
  @MaxLength(2000)
  @ApiProperty({
    required: false,
  })
  message: string;

  @IsMongoId()
  @ApiProperty({
    required: true,
  })
  to: string;
}
