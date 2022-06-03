import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from './dtos/createAccount.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createAccount({
    email,
    password,
    name,
  }: CreateAccountInputDto): Promise<CreateAccountOutputDto> {
    const exist = await this.userRepository.findOne({
      where: { email },
    });

    if (exist) {
      return {
        ok: false,
        error: '이미 사용중인 이메일입니다.',
      };
    }
    await this.userRepository.save(
      this.userRepository.create({ email, password, name }),
    );
    return {
      ok: true,
    };
  }
}
