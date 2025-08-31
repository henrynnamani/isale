import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../model/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    try {
      await this.userRepository.save(newUser);
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }

    return newUser;
  }

  async verifyUserEmail(user: User): Promise<boolean> {
    try {
      await this.userRepository.update(user.id, {
        emailVerified: true,
      });

      return true;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async storeRefreshToken(user: User, token: string) {
    const refreshHash = await bcrypt.hash(token, 10);
    await this.userRepository.update(user.id, {
      refreshToken: refreshHash,
    });
  }
}
