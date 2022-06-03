import { IsBoolean, IsOptional, isString, IsString } from 'class-validator';

export class CommonOutputDto {
  @IsBoolean()
  ok: boolean;

  @IsOptional()
  @IsString()
  error?: string;
}
