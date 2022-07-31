import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTrackInput, CreateTrackOutput } from './dtos/track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  // Create
  async create(
    createTrackInput: CreateTrackInput,
    user: User,
  ): Promise<CreateTrackOutput> {
    const track = await this.trackRepository.save(
      this.trackRepository.create({
        ...createTrackInput,
        user: user,
      }),
    );

    return { ok: true, trackId: track.id };
  }
  // Read
  async getTracksByUserId(userId: number) {
    const tracks = await this.trackRepository
      .createQueryBuilder('track')
      .where('track.userId = :id', { id: userId })
      .orderBy({
        'track.createdAt': 'DESC',
      })
      .leftJoin('track.user', 'user')
      .addSelect('user.id')
      .addSelect('user.avatarUrl')
      .addSelect('user.username')
      .getMany();
    return tracks;
  }
  async getTrackById(trackId: number) {
    try {
      const track = await this.trackRepository.findOne({
        where: { id: trackId },
      });
      return track;
    } catch (e) {
      throw new Error('트랙이 없습니다.');
    }
  }
  // Update
  // Delete
  async delete(trackId: number, user: User): Promise<CommonOutput> {
    try {
      const track = await this.trackRepository.findOne({
        where: { id: trackId },
        relations: ['user'],
      });

      if (!track) {
        return {
          ok: false,
          message: '트랙이 존재하지 않습니다.',
        };
      }
      if (track.user.id !== user.id) {
        return {
          ok: false,
          message: '트랙을 삭제할 권한이 없습니다.',
        };
      }

      await this.trackRepository.delete(trackId);
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        message: '서버 에러',
      };
    }
  }
}
