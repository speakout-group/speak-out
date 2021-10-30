import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class ConfSpeakerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(2000)
  bio: string;

  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
  end: Date;

  @IsMongoId()
  confId: string;
}
