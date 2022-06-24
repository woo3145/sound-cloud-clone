import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrackInput, CreateTrackOutput } from './dtos/track.dto';
import { TrackService } from './track.service';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('')
  async createTrack(
    @Body() createTrackInput: CreateTrackInput,
    @Req() req,
  ): Promise<CreateTrackOutput> {
    try {
      return this.trackService.create(createTrackInput, req.user);
    } catch (e) {
      console.log('Create Track Error\n', e);
      throw e;
    }
  }
}
