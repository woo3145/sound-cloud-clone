import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import {
  CreateAccountInput,
  EditUserInput,
  GetUserOutput,
  GetUserTracksOutput,
} from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create User
  @ApiBody({ type: CreateAccountInput })
  @ApiResponse({ status: 201, type: CommonOutput })
  @Public()
  @Post('register')
  async register(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CommonOutput> {
    try {
      return this.userService.register(createAccountInput);
    } catch (e) {
      console.log('Register Error\n', e);
      throw e;
    }
  }
  // Get User
  @Public()
  @Get(':userId')
  async getUser(@Param('userId') userId: number): Promise<GetUserOutput> {
    try {
      return this.userService.getUser(userId);
    } catch (e) {
      console.log('Get User Error\n', e);
      throw e;
    }
  }
  // Edit User
  @Patch('')
  async editUser(
    @Req() req,
    @Body() editUserInput: EditUserInput,
  ): Promise<CommonOutput> {
    try {
      return this.userService.editUser(req.user, editUserInput);
    } catch (e) {
      console.log('Edit User Error\n', e);
      throw e;
    }
  }

  // Get User Tracks

  @Public()
  @Get(`:userId/tracks`)
  async getUserTracks(
    @Param('userId') userId: number,
  ): Promise<GetUserTracksOutput> {
    try {
      return this.userService.getUserTracks(userId);
    } catch (e) {
      console.log('Get User Tracks Error\n', e);
      throw e;
    }
  }
}
