import {
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.gurad';
import { Public } from './auth.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { RefreshOutput } from './dtos/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiBody({ type: LoginInput })
  @ApiResponse({ description: '로그인 성공', type: LoginOutput, status: 201 })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<LoginOutput> {
    try {
      // local strategy를 통과하여 받은 user객체
      const user = req.user;
      // user.id 값으로 jwt token과 refresh token cookie을 생성
      const { accessToken, accessTokenExpire } =
        this.authService.getJwtAccessToken(user.id);
      const { refreshToken, ...refreshOptions } =
        this.authService.getCookieWithJwtRefreshToken(user.id);

      //유저 DB의 refresh table을 업데이트해줌
      await this.userService.setCurrentHashedRefreshToken(
        refreshToken,
        user.id,
      );

      // 응답에 Refresh 쿠키를 담아줌
      res.cookie('Refresh', refreshToken, refreshOptions);
      console.log(res);
      return {
        ok: true,
        message: '성공적으로 로그인 되었습니다.',
        user,
        accessToken,
        accessTokenExpire,
      };
    } catch (e) {
      console.log('Login Error\n', e);
      throw new InternalServerErrorException();
    }
  }

  // refresh guard를 통과하면 그 user객체로 accesstoken을 발급해줍니다.
  @Public()
  @ApiResponse({
    description: 'Access Token 재발급 성공',
    type: RefreshOutput,
    status: 201,
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Request() req): RefreshOutput {
    try {
      const user = req.user;
      const { accessToken, accessTokenExpire } =
        this.authService.getJwtAccessToken(user.id);

      return {
        ok: true,
        accessToken,
        accessTokenExpire,
      };
    } catch (e) {
      console.log('Refresh Error\n', e);
      throw new InternalServerErrorException();
    }
  }

  // refresh gurad를 통과하면 해당 유저의 DB에서 refresh token을 제거하고 클라이언트의 쿠키를 만료시켜줍니다.
  @Public()
  @ApiResponse({
    description: '로그아웃 성공',
    type: CommonOutput,
    status: 201,
  })
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  logout(@Request() req, @Response({ passthrough: true }) res): CommonOutput {
    try {
      const refreshOption = this.authService.getCookiesForLogOut();

      this.userService.removeRefreshToken(req.user.id);

      res.cookie('Refresh', '', refreshOption);

      return {
        ok: true,
        message: '성공적으로 로그아웃 되었습니다.',
      };
    } catch (e) {
      console.log('Logout Error \n', e);
      throw new InternalServerErrorException();
    }
  }
}
