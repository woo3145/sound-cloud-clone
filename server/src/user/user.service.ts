import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInputDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
    username,
  }: CreateAccountInputDto): Promise<User> {
    const exist = await this.userRepository.findOne({
      where: { email },
    });

    if (exist) {
      throw new Error('이미 사용중인 이메일입니다.');
    }
    return await this.userRepository.save(
      this.userRepository.create({ email, password, username }),
    );
  }

  // refresh token을 해쉬하여 유저의 DB에 저장합니다.
  async setCurrentHashedRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }

  // refresh token이 일치하는지 확인 후 일치하다면 유저를 반환합니다.
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      const { password, currentHashedRefreshToken, ...filteredUser } = user;
      return filteredUser;
    }
  }

  // logout시 유저 DB의 currentHashedRefreshToken를 제거해줍니다.
  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
