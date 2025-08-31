import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/users.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class UserExistProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkUserExistByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException(SYS_MSG.USER_EXIST);
      }

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async checkUserNotExistByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      if (user) {
        throw new NotFoundException(SYS_MSG.USER_EXIST);
      }

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async checkUserExist(id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });

      if (!user) {
        throw new NotFoundException(SYS_MSG.USER_DOES_NOT_EXIST);
      }

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
