import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class DeleteDirectMessageDto {
  @IsMongoId()
  @ApiProperty({
    required: true
  })
  to: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false
  })
  messageId?: string;
}
