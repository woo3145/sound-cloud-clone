import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { CreateAccountInput } from 'src/user/dtos/user.dto';
import { CreateTrackInput, CreateTrackOutput } from './dtos/track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Public()
  @Post('')
  async createTrack(
    @Body() createTrackInput: CreateTrackInput,
    @Req() req,
  ): Promise<CreateTrackOutput> {
    console.log(createTrackInput);
    try {
      return this.trackService.create(createTrackInput, req.user);
    } catch (e) {
      console.log('Create Track Error\n', e);
      throw e;
    }
  }
}
