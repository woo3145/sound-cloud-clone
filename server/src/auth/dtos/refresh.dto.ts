import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class RefreshOutput extends CommonOutput {
  @ApiProperty()
  @IsString()
  accessToken: string;
  @ApiProperty()
  @IsNumber()
  accessTokenExpire: number;
}
