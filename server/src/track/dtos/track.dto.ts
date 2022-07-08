import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class CreateTrackInput {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description?: string;

  @ApiProperty({ type: String })
  artworkUrl?: string;

  @ApiProperty({ type: Boolean })
  isPublic: boolean;

  @ApiProperty({ type: String })
  genre: string;

  @ApiProperty({ type: String })
  audioUrl: string;

  @ApiProperty({ type: Number })
  duration: number;
}

export class CreateTrackOutput extends CommonOutput {
  @ApiProperty({ type: Number })
  trackId: number;
}
