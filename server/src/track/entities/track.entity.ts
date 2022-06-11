import { IsBoolean, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/dtos/common.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Track extends CommonEntity {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description?: string;

  @Column({ nullable: true })
  @IsString()
  artworkUrl?: string;

  @Column()
  @IsBoolean()
  isPublic: boolean;

  @Column({ nullable: true })
  @IsString()
  genre?: string;

  @Column()
  @IsString()
  audioUrl: string;

  @ManyToOne(() => User, (user) => user.tracks, { onDelete: 'SET NULL' })
  user: User;
}
