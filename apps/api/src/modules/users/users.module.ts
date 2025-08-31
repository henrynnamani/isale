import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/users.entity';
import { AuthModule } from '../auth/auth.module';
import { UserExistProvider } from './providers/user-exist.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, UserExistProvider],
  controllers: [UsersController],
  exports: [UserExistProvider, UsersService],
})
export class UsersModule {}
