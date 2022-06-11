import { IsBoolean, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class CreateTrackInput {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  artworkUrl?: string;

  @IsBoolean()
  isPublic: boolean;

  @IsString()
  genre?: string;

  @IsString()
  audioUrl: string;
}

export class CreateTrackOutput extends CommonOutput {}
