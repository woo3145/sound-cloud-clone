import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { Track } from 'src/track/entities/track.entity';
import { User } from '../entities/user.entity';

export class CreateAccountInput {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  username: string;
}

export class EditUserInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class GetUserOutput extends CommonOutput {
  user: User;
}
export class GetUserTracksOutput extends CommonOutput {
  tracks: Track[];
}
