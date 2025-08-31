import { forwardRef, Module } from '@nestjs/common';
import { OtpService } from './provider/otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './model/otp.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), forwardRef(() => UsersModule)],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
