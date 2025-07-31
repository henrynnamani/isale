import { Module } from '@nestjs/common';
import { RomController } from './rom.controller';
import { RomService } from './provider/rom.service';
import { Rom } from './model/rom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RomExistProvider } from './providers/rom-exist.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Rom])],
  controllers: [RomController],
  providers: [RomService, RomExistProvider],
})
export class RomModule {}
