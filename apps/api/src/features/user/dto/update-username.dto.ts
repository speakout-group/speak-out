import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameDto {
  @ApiProperty({
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,20}/, {
    message: 'Usuário inválido',
  })
  username: string;
}
