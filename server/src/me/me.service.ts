import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkFollowsUser(user: User, userId: number) {
    try {
      const exist = await this.userRepository.findOne({
        where: {
          id: user.id,
          followings: {
            id: userId,
          },
        },
        relations: ['followings'],
      });
      return {
        ok: true,
        state: exist ? true : false,
      };
    } catch (e) {
      return {
        ok: false,
        message: '팔로우 정보를 가져오지 못했습니다.',
      };
    }
  }

  async followUsers(user: User, userId: number) {
    try {
      const me = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['followings'],
      });
      const usersToFollow = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!usersToFollow) {
        return {
          ok: false,
          message: '팔로우 할 사용자가 존재하지 않습니다.',
        };
      }

      me.followings.push(usersToFollow);
      await this.userRepository.save(me);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        message: '팔로우 하는 도중 오류가 발생했습니다.',
      };
    }
  }

  async unfollowUsers(user: User, userId: number) {
    try {
      const me = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['followings'],
      });

      me.followings = me.followings.filter((u) => u.id !== userId);
      await this.userRepository.save(me);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        message: '언팔로우 하는 도중 오류가 발생했습니다.',
      };
    }
  }
}
