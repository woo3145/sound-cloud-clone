import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { CreateAccountInput } from './dtos/user.dto';
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

  // Edit User
}
