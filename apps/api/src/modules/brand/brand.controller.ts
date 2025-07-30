import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BrandService } from './provider/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { createbrandDoc } from './doc/create-brand.doc';
import { deleteBrandDoc } from './doc/delete-brand.doc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @createbrandDoc()
  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @deleteBrandDoc()
  @Delete(':id')
  deleteBrand(@Param('id') brandId: string) {
    return this.brandService.deleteBrand(brandId);
  }
}
