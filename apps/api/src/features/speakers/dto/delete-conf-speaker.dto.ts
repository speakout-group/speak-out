import { IsMongoId, IsOptional } from 'class-validator';

export class DeleteConfSpeakerDto {
  @IsOptional()
  @IsMongoId()
  speakerId?: string;

  @IsMongoId()
  confId: string;
}
