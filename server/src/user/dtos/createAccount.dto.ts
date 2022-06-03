import { IsString } from 'class-validator';
import { CommonOutputDto } from 'src/common/dtos/common.dto';

export class CreateAccountInputDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class CreateAccountOutputDto extends CommonOutputDto {}
