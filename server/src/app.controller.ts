import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommonOutput } from './common/dtos/common.dto';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor() {}

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req): CommonOutput & { profile: User } {
    return {
      ok: true,
      profile: req.user,
    };
  }
}
