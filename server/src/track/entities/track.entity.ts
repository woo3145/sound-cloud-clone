import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/dtos/common.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Track extends CommonEntity {
  @Column()
  @IsString()
  @ApiProperty()
  title: string;

  @Column()
  @IsString()
  @ApiProperty()
  description?: string;

  @Column({ nullable: true })
  @IsString()
  @ApiProperty()
  artworkUrl?: string;

  @Column()
  @IsBoolean()
  @ApiProperty()
  isPublic: boolean;

  @Column({ nullable: true })
  @IsString()
  @ApiProperty()
  genre?: string;

  @Column()
  @IsString()
  @ApiProperty()
  audioUrl: string;

  @Column()
  @IsNumber()
  @ApiProperty()
  duration: number;

  @ManyToOne(() => User, (user) => user.tracks, { onDelete: 'SET NULL' })
  user: User;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.favoriteTracks)
  favoriteUsers: User[];
}
