import { Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  // followings & unfollowings
  @Get('followings/:user_id')
  async checkFollowsUser(@Param('user_id') userId: number, @Req() req) {
    return this.meService.checkFollowsUser(req.user, userId);
  }
  @Put('followings/:user_id')
  async followUsers(@Param('user_id') userId: number, @Req() req) {
    return this.meService.followUsers(req.user, userId);
  }
  @Delete('followings/:user_id')
  async unfollowUsers(@Param('user_id') userId: number, @Req() req) {
    return this.meService.unfollowUsers(req.user, userId);
  }
}
