import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSponsorDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  logo: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  website: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  youtube: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  linkedin: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  instagram: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  facebook: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  twitter: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  calendlyUrl: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsUrl()
  @IsOptional()
  formUrl: string;
}
