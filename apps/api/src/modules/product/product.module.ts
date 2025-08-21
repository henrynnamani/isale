import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './provider/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { SaveProductProvider } from './providers/save-product.provider';
import { BrandExistProvider } from '../brand/providers/brand-exist.provider';
import { CategoryExistProvider } from '../category/providers/category-exist.provider';
import { RamExistProvider } from '../ram/providers/ram-exist.provider';
import { RomExistProvider } from '../rom/providers/rom-exist.provider';
import { VendorExistProvider } from '../vendors/providers/vendor-exist.provider';
import { ColorExistProvider } from '../color/providers/color-exist.provider';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { RamModule } from '../ram/ram.module';
import { RomModule } from '../rom/rom.module';
import { VendorsModule } from '../vendors/vendors.module';
import { ColorModule } from '../color/color.module';
import { PaginationService } from '@/shared/pagination/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BrandModule,
    CategoryModule,
    RamModule,
    RomModule,
    VendorsModule,
    ColorModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, SaveProductProvider, PaginationService],
})
export class ProductModule {}
