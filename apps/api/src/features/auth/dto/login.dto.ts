import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsNotEmpty()
  @IsString()
  username: string;


  @ApiProperty({
    type: String,
    required: true
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
