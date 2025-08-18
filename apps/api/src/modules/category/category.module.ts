import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './provider/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './model/category.entity';
import { CategoryExistProvider } from './providers/category-exist.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryExistProvider]
})
export class CategoryModule {}
