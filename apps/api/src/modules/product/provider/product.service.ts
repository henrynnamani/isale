import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveProductProvider } from '../providers/save-product.provider';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly saveProductProvider: SaveProductProvider,
  ) {}

  // TODO: Add a
  createProduct(createProductDto: CreateProductDto) {
    // upload image

    // create product
    this.saveProductProvider.saveProduct(createProductDto);
    console.log(createProductDto);
  }
}
