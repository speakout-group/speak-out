import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 6,
    maxLength: 60,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 6,
    maxLength: 60,
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
