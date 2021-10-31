import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmailDto {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
