import { Module } from '@nestjs/common';
import { RamController } from './ram.controller';
import { RamService } from './provider/ram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ram } from './model/ram.entity';
import { RamExistProvider } from './providers/ram-exist.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Ram])],
  controllers: [RamController],
  providers: [RamService, RamExistProvider],
  exports: [RamExistProvider],
})
export class RamModule {}
