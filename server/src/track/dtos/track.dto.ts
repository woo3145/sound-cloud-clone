import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class CreateTrackInput {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsString()
  @ApiProperty()
  artworkUrl?: string;

  @IsBoolean()
  @ApiProperty()
  isPublic: boolean;

  @IsString()
  @ApiProperty()
  genre?: string;

  @IsString()
  @ApiProperty()
  audioUrl: string;

  @IsNumber()
  @ApiProperty()
  duration: number;
}

export class CreateTrackOutput extends CommonOutput {}
