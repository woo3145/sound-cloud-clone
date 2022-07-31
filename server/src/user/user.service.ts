import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  EditUserInput,
  GetUserOutput,
  GetUserTracksOutput,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly trackService: TrackService,
  ) {}
  /* queries */
  findOneByEmail(email: string): Promise<User> | null {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
  findOneWithAllFieldsByEmail(email: string): Promise<User> | null {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.currentHashedRefreshToken')
      .where('user.email = :email', { email })
      .getOne();
  }
  findOneById(id: number): Promise<User> | null {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }
  findOneWithAllFieldsById(id: number): Promise<User> | null {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.password')
      .addSelect('user.currentHashedRefreshToken')
      .getOne();
  }

  async getUserTracks(userId: number): Promise<GetUserTracksOutput> {
    const tracks = await this.trackService.getTracksByUserId(userId);
    return { ok: true, tracks };
  }
  async getUser(userId: number): Promise<GetUserOutput> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .select('user.id')
      .addSelect('user.avatarUrl')
      .addSelect('user.username')
      .getOne();

    return {
      ok: true,
      user,
    };
  }

  // method
  async register({
    email,
    password,
    username,
  }: CreateAccountInput): Promise<CommonOutput> {
    const exist = await this.userRepository.findOne({
      where: { email },
    });
    if (exist) {
      throw new BadRequestException('이미 사용중인 이메일입니다.');
    }
    await this.userRepository.save(
      this.userRepository.create({ email, password, username }),
    );
    return {
      ok: true,
      message: '성공적으로 계정이 생성되었습니다.',
    };
  }
  async editUser(
    user: User,
    { username, avatarUrl }: EditUserInput,
  ): Promise<CommonOutput> {
    if (!username && !avatarUrl) {
      throw new Error('변경 된 내용이 없습니다.');
    }
    if (username) {
      user.username = username;
    }
    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    await this.userRepository.save(user);

    return {
      ok: true,
      message: '성공적으로 프로필 업데이트에 성공했습니다.',
    };
  }

  // refresh token을 해쉬하여 유저의 DB에 저장합니다.
  async setCurrentHashedRefreshToken(
    refreshToken: string,
    id: number,
  ): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }

  // refresh token이 일치하는지 확인 후 일치하다면 유저를 반환합니다.
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: number,
  ): Promise<User> | null {
    const user = await this.findOneWithAllFieldsById(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      const { password, currentHashedRefreshToken, ...filteredUser } = user;
      return filteredUser as User;
    }
  }

  // logout시 유저 DB의 currentHashedRefreshToken를 제거해줍니다.
  async removeRefreshToken(id: number): Promise<void> {
    this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }

  async likesTrack(me: User, trackId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: me.id },
        relations: ['favoriteTracks'],
      });
      const track = await this.trackService.getTrackById(trackId);
      user.favoriteTracks.push(track);
      await this.userRepository.save(user);
      return;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
