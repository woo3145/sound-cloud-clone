import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
