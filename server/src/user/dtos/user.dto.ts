import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { Track } from 'src/track/entities/track.entity';

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

export class GetUserTracksOutput extends CommonOutput {
  collection: Track[];
}
