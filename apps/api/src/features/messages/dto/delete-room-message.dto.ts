import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class DeleteRoomMessageDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
  })
  messageId?: string;

  @IsMongoId()
  @ApiProperty({
    required: false,
  })
  roomId: string;
}
