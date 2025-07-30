import { Body, Controller, Post } from '@nestjs/common';
import { BrandService } from './provider/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { createbrandDoc } from './doc/create-brand.doc';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @createbrandDoc()
  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }
}
