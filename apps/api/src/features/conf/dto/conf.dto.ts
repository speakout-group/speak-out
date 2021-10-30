import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ConfDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}
