import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './provider/category.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { addCategoryDoc } from './doc/add-category.doc';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CreateDoc('Create category', AddCategoryDto)
  addCategory(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(addCategoryDto);
  }

  @Get()
  @CreateGetDoc('Get categories', AddCategoryDto)
  getCategories() {
    return this.categoryService.getAllCategory();
  }
}
