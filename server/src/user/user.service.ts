import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInputDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import * as brypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create({
    email,
    password,
    name,
  }: CreateAccountInputDto): Promise<User> {
    const exist = await this.userRepository.findOne({
      where: { email },
    });

    if (exist) {
      throw new Error('이미 사용중인 이메일입니다.');
    }
    return await this.userRepository.save(
      this.userRepository.create({ email, password, name }),
    );
  }

  async setCurrentHashedRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await brypt.hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const { password: _, ...user } = await this.userRepository.findOne({
      where: { id },
    });

    const isRefreshTokenMatching = await brypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
