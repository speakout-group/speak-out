import { ObjectId } from '../../../shared/mongoose/object-id';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class ConfSpeakerDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  
  @ApiProperty({
    type: String,
    maxLength: 2000
  })
  @IsString()
  @MaxLength(2000)
  bio: string;


  @ApiProperty({
    type: Date,
    required: true
  })
  @IsDateString()
  @IsNotEmpty()
  start: Date;


  @ApiProperty({
    type: Date,
    required: false
  })
  @IsDateString()
  end: Date;


  @ApiProperty({
    type: ObjectId,
    required: true
  })
  @IsNotEmpty()
  @IsMongoId()
  confId: string;
}
