import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './provider/product.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';
import { CreateProductDto } from './dto/create-product.dto';
import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import { FilterProductWithPaginationDto } from './dto/filter-product.dto';
import { FilterProductDoc } from './doc/filter-product.doc';
import { ProductDetailDto } from './dto/product-detail.dto';
import { DeleteProductParamDto } from './dto/delete-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { skipAuth } from '@/shared/decorators';

@skipAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @CreateDoc('Create Product', CreateProductDto)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @CreateGetDoc('Fetch all product', CursorPaginationDto)
  @Get('')
  allProducts(@Query() paginationDto: CursorPaginationDto) {
    return this.productService.getProducts(paginationDto);
  }

  @FilterProductDoc()
  @Get('filter')
  filterProduct(@Query() filterProductDto: FilterProductWithPaginationDto) {
    return this.productService.filterProducts(filterProductDto, {
      cursor: filterProductDto.cursor,
      limit: filterProductDto.limit,
    });
  }

  @Get(':id')
  @CreateGetDoc('Fetch product detail', ProductDetailDto)
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  productDetail(@Param() productQueryDto: ProductDetailDto) {
    return this.productService.productDetail(productQueryDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Product ID ' })
  @CreateGetDoc('Delete product', DeleteProductParamDto)
  deleteProduct(@Param() deleteProductParamDto: DeleteProductParamDto) {
    return this.productService.deleteProduct(deleteProductParamDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'Product ID ' })
  @CreateDoc('Update product', UpdateProductDto)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<UpdateProductDto>,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
}
