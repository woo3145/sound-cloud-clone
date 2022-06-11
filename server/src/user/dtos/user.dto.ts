import { IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class CreateAccountInputDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class CreateAccountOutputDto extends CommonOutput {}
