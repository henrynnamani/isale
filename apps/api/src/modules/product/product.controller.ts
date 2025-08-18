import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './provider/product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDoc } from './doc/create-product.doc';
import { CreateDoc } from '@/shared/doc-response';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @CreateDoc('Create Product', CreateProductDto)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
