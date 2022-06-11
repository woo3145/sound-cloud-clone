import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { CommonEntity } from 'src/common/dtos/common.entity';
import { Track } from 'src/track/entities/track.entity';
import { IsString } from 'class-validator';
@Entity()
export class User extends CommonEntity {
  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ nullable: true })
  @IsString()
  currentHashedRefreshToken?: string;

  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
