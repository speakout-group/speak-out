import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;
}
