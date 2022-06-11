import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, isString, IsString } from 'class-validator';

export class CommonOutput {
  @ApiProperty()
  @IsBoolean()
  ok: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  error?: string;
}
