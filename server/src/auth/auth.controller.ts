import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from '../user/dtos/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.gurad';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const user = req.user;
    const { accessToken, ...accessOptions } =
      this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, ...refreshOptions } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentHashedRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOptions);
    res.cookie('Refresh', refreshToken, refreshOptions);

    return user;
  }

  @Post('register')
  async register(
    @Body() createAccountInput: CreateAccountInputDto,
  ): Promise<CreateAccountOutputDto> {
    return this.authService.register(createAccountInput);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Request() req, @Response({ passthrough: true }) res) {
    const user = req.user;
    const { accessToken, ...accessOptions } =
      this.authService.getCookieWithJwtAccessToken(user.id);

    res.cookie('Authentication', accessToken, accessOptions);

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  logout(@Request() req, @Response({ passthrough: true }) res) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();

    this.userService.removeRefreshToken(req.user.id);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);
  }
}
