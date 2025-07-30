import { Module } from '@nestjs/common';
import { RamController } from './ram.controller';
import { RamService } from './provider/ram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ram } from './model/ram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ram])],
  controllers: [RamController],
  providers: [RamService],
})
export class RamModule {}
