import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // email, password가 검증
  async validateUser(email: string, pass: string): Promise<User> | null {
    const user = await this.userService.findOneWithAllFieldsByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, currentHashedRefreshToken, ...filteredUser } = user;
      return filteredUser as User;
    }
    return null;
  }

  // 유저 id로 jwt token과 cookie에 담을 옵션을 반환합니다.
  getJwtAccessToken(userId: number): {
    accessToken: string;
    accessTokenExpire: number;
  } {
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
  getCookieWithJwtRefreshToken(
    userId: number,
  ): CookieOptions & { refreshToken: string } {
    const token = this.jwtService.sign(
      { id: userId },
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
  getCookiesForLogOut(): CookieOptions {
    return { domain: 'localhost', path: '/', httpOnly: true, maxAge: 0 };
  }
}
