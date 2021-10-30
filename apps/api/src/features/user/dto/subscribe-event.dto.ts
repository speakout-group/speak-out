import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class SubscribeEventDto {
  @IsOptional()
  @IsBoolean()
  sharedEmail: boolean;

  @IsNotEmpty()
  @IsBoolean()
  confirmPresence: boolean;
}
