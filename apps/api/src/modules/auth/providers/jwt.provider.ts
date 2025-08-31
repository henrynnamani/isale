import { User } from '@/modules/users/model/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const access = await this.jwtService.signAsync(payload);
    const refresh = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('auth.jwtRefreshTokenExpire'),
    });

    return {
      access_token: access,
      refresh_token: refresh,
    };
  }

  async generateAccessToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const access = await this.jwtService.signAsync(payload);

    return access;
  }

  async checkTokenExpired(token: string): Promise<boolean> {
    const decoded: any = this.jwtService.decode(token);

    if (!decoded || !decoded.exp) {
      throw new NotFoundException('Invalid token or missing expiration claim.');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
}
