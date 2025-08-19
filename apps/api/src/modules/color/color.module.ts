import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './provider/color.service';
import { Color } from './model/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorExistProvider } from './providers/color-exist.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService, ColorExistProvider],
  exports: [ColorExistProvider],
})
export class ColorModule {}
