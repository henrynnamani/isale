import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './provider/product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';
import { CreateProductDto } from './dto/create-product.dto';
import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import {
  FilterProductDto,
  FilterProductWithPaginationDto,
} from './dto/filter-product.dto';
import { FilterProductDoc } from './doc/filter-product.doc';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @CreateDoc('Create Product', CreateProductDto)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @CreateGetDoc('Get Products', CursorPaginationDto)
  @Get('cursor')
  allProducts(@Query() paginationDto: CursorPaginationDto) {
    return this.productService.getProducts(paginationDto);
  }

  /**
   * Filter by
   * - Ram x
   * - name x
   * - Rom x
   * - Price
   * - colors x
   * - brand x
   * - category x
   * - condition x
   */

  @FilterProductDoc()
  @Get('filter')
  filterProduct(@Query() filterProductDto: FilterProductWithPaginationDto) {
    return this.productService.filterProducts(filterProductDto, {
      cursor: filterProductDto.cursor,
      limit: filterProductDto.limit,
    });
  }
}
