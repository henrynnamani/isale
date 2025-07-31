import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './provider/category.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { addCategoryDoc } from './doc/add-category.doc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @addCategoryDoc()
  @Post()
  addCategory(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(addCategoryDto);
  }

  // updateCategory(@Body() updateCategoryDto: )
}
