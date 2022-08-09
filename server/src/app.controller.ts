import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommonOutput } from './common/dtos/common.dto';
import { User } from './user/entities/user.entity';
import { OmitType } from '@nestjs/swagger';

class FilteredUser extends OmitType(User, [
  'password',
  'currentHashedRefreshToken',
]) {}
class GetProfileOutput extends CommonOutput {
  profile?: FilteredUser;
}

@Controller()
export class AppController {
  @ApiResponse({
    status: 201,
    type: GetProfileOutput,
  })
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req): GetProfileOutput {
    return {
      ok: true,
      profile: req.user,
    };
  }
}
