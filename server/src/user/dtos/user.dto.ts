import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class CreateAccountInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  username: string;
}

export class CreateAccountOutput extends CommonOutput {}
