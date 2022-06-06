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
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    // local strategy를 통과하여 받은 user객체
    const user = req.user;

    // user.id 값으로 jwt token과 refresh token을 생성
    const { accessToken, ...accessOptions } =
      this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, ...refreshOptions } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    //유저 DB의 refresh table을 업데이트해줌
    await this.userService.setCurrentHashedRefreshToken(refreshToken, user.id);

    // 응답에 쿠키를 담아줌
    res.cookie('Authentication', accessToken, accessOptions);
    res.cookie('Refresh', refreshToken, refreshOptions);

    // 클라이언트에서 accessToken의 만료값을 체크하여 refresh token을 발급받아야 하는지 확인하기 위함 (local storage 저장)
    const accessTokenExpire =
      Date.now() +
      Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) * 1000;

    return {
      user,
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
    const { accessToken, ...accessOptions } =
      this.authService.getCookieWithJwtAccessToken(user.id);

    res.cookie('Authentication', accessToken, accessOptions);

    return user;
  }

  // refresh gurad를 통과하면 해당 유저의 DB에서 refresh token을 제거하고 클라이언트의 쿠키를 만료시켜줍니다.
  @Public()
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
