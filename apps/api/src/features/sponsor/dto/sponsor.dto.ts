import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SponsorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsString()
  description: string
  
  @IsString()
  slug: string
  
  @IsString()
  color: string
  
  @IsString()
  website: string
  
  @IsString()
  youtube: string

}