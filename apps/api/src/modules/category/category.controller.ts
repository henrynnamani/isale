import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './provider/category.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { addCategoryDoc } from './doc/add-category.doc';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoc } from '@/shared/doc-response';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CreateDoc('Create category', AddCategoryDto)
  addCategory(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(addCategoryDto);
  }
}
