import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UserExistProvider } from '@/modules/users/providers/user-exist.provider';
import * as SYS_MSG from '@/shared/system-message';
import { HashingProvider } from './hashing.provider';
import { JwtProvider } from '../providers/jwt.provider';
import { UsersService } from '@/modules/users/provider/users.service';
import { OtpService } from '@/modules/otp/provider/otp.service';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import * as bcrypt from 'bcryptjs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userExistProvider: UserExistProvider,
    private readonly hashingProvider: HashingProvider,
    private readonly userService: UsersService,
    private readonly jwtProvider: JwtProvider,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
    private readonly otpService: OtpService,
  ) {}
  async signup(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser =
      await this.userExistProvider.checkUserNotExistByEmail(email);

    if (existingUser) {
      throw new ConflictException(SYS_MSG.USER_WITH_EMAIL_EXIST);
    }

    const hashedPassword = await this.hashingProvider.hashPassword(password);

    try {
      const user = await this.userService.createUser({
        ...registerDto,
        password: hashedPassword,
      });

      const result = await this.otpService.createOtp(user);

      const verification_url = `http://localhost:3000/api/v1/verify?token=${result.code}`;

      await this.mailQueue.add('send-welcome-email', {
        name: user.name,
        otp: result.code,
        subject: 'OTP Verification',
        verification_url,
      });

      return {
        data: result,
        message: 'working!',
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async signin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userExistProvider.checkUserExistByEmail(email);

    if (!user.emailVerified) {
      throw new BadRequestException(SYS_MSG.USER_EMAIL_UNVERIFIED);
    }

    const validPassword = await this.hashingProvider.compare(
      password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException(SYS_MSG.INVALID_CREDENTIAL);
    }

    const result = await this.jwtProvider.generateToken(user);

    await this.userService.storeRefreshToken(user, result.refresh_token);

    return {
      data: { user, ...result },
      message: SYS_MSG.SIGN_IN,
    };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const expired = await this.jwtProvider.checkTokenExpired(
      refreshTokenDto.token,
    );

    const user = await this.userExistProvider.checkUserExistByEmail(
      refreshTokenDto.email,
    );

    if (!expired) {
      const access = await this.jwtProvider.generateAccessToken(user);

      return {
        data: { access_token: access, refresh_token: refreshTokenDto.token },
      };
    }

    const verified = await bcrypt.compare(
      refreshTokenDto.token,
      user.refreshToken,
    );

    if (!verified) {
      throw new UnauthorizedException(SYS_MSG.INVALID_TOKEN);
    }

    const result = await this.jwtProvider.generateToken(user);

    await this.userService.storeRefreshToken(user, result.refresh_token);

    return {
      data: { ...result },
      message: 'Refresh token generated successfully',
    };
  }
}
