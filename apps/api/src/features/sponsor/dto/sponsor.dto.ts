import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SponsorDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}
