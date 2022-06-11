import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return {
      ok: true,
      profile: req.user,
    };
  }
}
