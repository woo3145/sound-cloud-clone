import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, isString, IsString } from 'class-validator';

export class CommonOutput {
  @ApiProperty()
  @IsBoolean()
  ok: boolean;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  error?: string;
}
