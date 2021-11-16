import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MaxLength } from 'class-validator';

export class RoomMessageDto {
  @IsString()
  @MaxLength(2000)
  @ApiProperty({
    required: true,
  })
  message: string;

  @IsMongoId()
  @ApiProperty({
    required: true,
  })
  roomId: string;
}
