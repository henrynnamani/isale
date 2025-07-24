import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../model/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';
import { HashingProvider } from '@/modules/auth/provider/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    let userExist = undefined;
    try {
      userExist = await this.userRepository.findBy({
        email: createUserDto.email,
      });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }

    if (userExist === null) {
      throw new BadRequestException(SYS_MSG.USER_EXIST);
    }

    // hash password
    const hashedPassword = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );

    const { password, ...user } = createUserDto;

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(newUser);
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }

    return {
      data: newUser,
      message: SYS_MSG.USER_CREATED_SUCCESSFULLY,
    };
  }
}
