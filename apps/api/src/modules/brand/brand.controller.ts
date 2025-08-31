import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BrandService } from './provider/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { deleteBrandDoc } from './doc/delete-brand.doc';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoc } from '@/shared/doc-response';
import { deleteBrandDto } from './dto/delete-brand.dto';

@ApiTags('brand')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @CreateDoc('Create brand', CreateBrandDto)
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @Delete(':id')
  @CreateDoc('Delete brand', deleteBrandDto)
  deleteBrand(@Param() deleteBrandDto: deleteBrandDto) {
    return this.brandService.deleteBrand(deleteBrandDto.id);
  }
}
