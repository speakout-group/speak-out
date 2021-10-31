import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeEventDto {
  @ApiProperty({
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  sharedEmail: boolean;

  @ApiProperty({
    type: Boolean,
    required: true
  })
  @IsNotEmpty()
  @IsBoolean()
  confirmPresence: boolean;
}
