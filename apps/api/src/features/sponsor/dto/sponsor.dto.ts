import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SponsorDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


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
  

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  color: string;
  
  
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  website: string;

  
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  youtube: string;
}
