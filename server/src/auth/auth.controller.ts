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
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    // local strategy를 통과하여 받은 user객체
    const user = req.user;

    // user.id 값으로 jwt token과 refresh token cookie을 생성
    const { accessToken, accessTokenExpire } =
      this.authService.getJwtAccessToken(user.id);
    const { refreshToken, ...refreshOptions } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    //유저 DB의 refresh table을 업데이트해줌
    await this.userService.setCurrentHashedRefreshToken(refreshToken, user.id);

    // 응답에 Refresh 쿠키를 담아줌
    res.cookie('Refresh', refreshToken, refreshOptions);
    return {
      user,
      accessToken,
      accessTokenExpire,
    };
  }

  @Public()
  @Post('register')
  async register(
    @Body() createAccountInput: CreateAccountInputDto,
  ): Promise<CreateAccountOutputDto> {
    return this.authService.register(createAccountInput);
  }

  // refresh guard를 통과하면 그 user객체로 accesstoken을 발급해줍니다.
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Request() req, @Response({ passthrough: true }) res) {
    const user = req.user;
    const { accessToken, accessTokenExpire } =
      this.authService.getJwtAccessToken(user.id);

    return {
      accessToken,
      accessTokenExpire,
    };
  }

  // refresh gurad를 통과하면 해당 유저의 DB에서 refresh token을 제거하고 클라이언트의 쿠키를 만료시켜줍니다.
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  logout(@Request() req, @Response({ passthrough: true }) res) {
    const { refreshOption } = this.authService.getCookiesForLogOut();

    this.userService.removeRefreshToken(req.user.id);

    res.cookie('Refresh', '', refreshOption);
  }
}
