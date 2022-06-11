import { IsBoolean, IsOptional, isString, IsString } from 'class-validator';

export class CommonOutput {
  @IsBoolean()
  ok: boolean;

  @IsOptional()
  @IsString()
  error?: string;
}
