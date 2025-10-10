import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './provider/telegram.service';
import { VendorsModule } from '../vendors/vendors.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { RamModule } from '../ram/ram.module';
import { RomModule } from '../rom/rom.module';
import { ColorModule } from '../color/color.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    VendorsModule,
    CloudinaryModule,
    BrandModule,
    CategoryModule,
    RamModule,
    RomModule,
    ColorModule,
    ProductModule
  ],
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
