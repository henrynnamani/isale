import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './provider/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { SaveProductProvider } from './providers/save-product.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, SaveProductProvider],
})
export class ProductModule {}
