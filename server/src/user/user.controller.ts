import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from './dtos/createAccount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post('signup')
  createAccount(
    @Body() createAccountInput: CreateAccountInputDto,
  ): Promise<CreateAccountOutputDto> {
    return this.userService.createAccount(createAccountInput);
  }
}
