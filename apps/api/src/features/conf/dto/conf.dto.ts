import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ConfDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;


  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  members: User[];

  owner: User;

  @ApiProperty({
    type: Date,
    required: true,
  })
  @IsDateString()
  start: Date;


  @ApiProperty({
    type: Date,
    required: true,
  })
  @IsDateString()
  end: Date;

  
  @ApiProperty({
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  createdAt: Date;

  updatedAt: Date;
}
