import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { CommonEntity } from 'src/common/dtos/common.entity';
import { Track } from 'src/track/entities/track.entity';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User extends CommonEntity {
  /* properties */
  @ApiProperty()
  @Column()
  @IsString()
  username: string;
  @ApiProperty()
  @Column({ unique: true })
  @IsString()
  email: string;
  @ApiProperty()
  @Column({ select: false })
  @IsString()
  password: string;
  @ApiProperty()
  @Column({ nullable: true, select: false })
  @IsString()
  currentHashedRefreshToken?: string;

  /* relations */
  @ApiProperty()
  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];

  /* methods */
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
