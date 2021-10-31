import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  members: User[];

  owner: User;

  @ApiProperty({
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

}
