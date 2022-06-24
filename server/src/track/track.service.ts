import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const tracks = await this.trackRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return tracks;
  }
  // Update
  // Delete
}
