import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from '../user/dtos/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // email, password가 검증
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, currentHashedRefreshToken, ...result } = user;
      return result;
    }
    return null;
  }

  async register({
    email,
    password,
    username,
  }: CreateAccountInputDto): Promise<CreateAccountOutputDto> {
    try {
      await this.userService.create({ email, password, username });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }

  // 유저 id로 jwt token과 cookie에 담을 옵션을 반환합니다.
  getJwtAccessToken(userId: number) {
    const accessToken = this.jwtService.sign(
      { id: userId },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        )}s`,
      },
    );

    return {
      accessToken,
      accessTokenExpire:
        Date.now() +
        Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) *
          1000,
    };
  }

  // 유저 id로 refresh token과 cookie에 담을 옵션을 반환합니다.
  getCookieWithJwtRefreshToken(id: number) {
    const token = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        )}s`,
      },
    );

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }

  // 각 jwt token과 refresh token의 cookie를 만료하기위한 옵션값들을 반환합니다.
  getCookiesForLogOut() {
    return {
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
