import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CommonOutput {
  @ApiProperty()
  @IsBoolean()
  ok: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
