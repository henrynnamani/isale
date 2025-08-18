import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { BrandExistProvider } from '@/modules/brand/providers/brand-exist.provider';
import { CategoryExistProvider } from '@/modules/category/providers/category-exist.provider';

@Injectable()
export class SaveProductProvider {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly brandExist: BrandExistProvider,
    private readonly categoryExist: CategoryExistProvider,
  ) {}

  async saveProduct(createProductDto: CreateProductDto) {
    console.log(createProductDto);
  }
}
