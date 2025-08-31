import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { JwtProvider } from './providers/jwt.provider';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../otp/otp.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MailModule,
    OtpModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    JwtProvider,
    GoogleStrategy,
    AuthGuard,
  ],
  exports: [HashingProvider],
})
export class AuthModule {}
