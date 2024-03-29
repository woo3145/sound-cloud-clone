import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonOutput } from 'src/common/dtos/common.dto';
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

  @Delete(':id')
  async deleteTrack(
    @Req() req,
    @Param('id') trackId: number,
  ): Promise<CommonOutput> {
    return this.trackService.delete(trackId, req.user);
  }
}
