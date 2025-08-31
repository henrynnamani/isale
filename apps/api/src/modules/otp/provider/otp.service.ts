import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from '../model/otp.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '@/modules/users/model/users.entity';
import { OTP_CODE_LENGTH } from '@/constant';
import * as SYS_MSG from '@/shared/system-message';
import { VerifyEmailDto } from '@/modules/auth/dto/verify-email.dto';
import { UsersService } from '@/modules/users/provider/users.service';
import { UserExistProvider } from '@/modules/users/providers/user-exist.provider';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly userService: UsersService,
    private readonly userExistProvider: UserExistProvider,
  ) {}
  generateOtp(length: number = 5): string {
    return randomBytes(length).toString('hex').slice(0, length);
  }

  async createOtp(user: User) {
    const code = this.generateOtp(OTP_CODE_LENGTH);

    try {
      const tokenRecord = this.otpRepository.create({
        token: await this.generateHashedOtp(code),
        user,
      });

      await this.otpRepository.save(tokenRecord);

      return {
        code,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  generateHashedOtp(code: string): Promise<string> {
    const hashedOtp = bcrypt.hash(code, 10);
    return hashedOtp;
  }

  async verifyOtp(verifyEmailDto: VerifyEmailDto, verifyEmailBodyDto: any) {
    const user = await this.userExistProvider.checkUserExistByEmail(
      verifyEmailBodyDto.email,
    );

    const now = new Date();

    const record = await this.otpRepository.findOne({
      where: {
        user: { email: verifyEmailBodyDto.email },
        expiry: MoreThan(now),
      },
      order: { expiry: 'DESC' },
    });

    if (!record) {
      throw new NotFoundException(SYS_MSG.EXPIRED_OTP);
    }

    const verified = await bcrypt.compare(verifyEmailDto.token, record.token);

    verified && (await this.userService.verifyUserEmail(user));

    return {
      message: 'email verified successfully',
    };
  }
}
