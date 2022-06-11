import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { User } from 'src/user/entities/user.entity';

export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class LoginOutput extends CommonOutput {
  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  user: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  accessTokenExpire: number;
}
