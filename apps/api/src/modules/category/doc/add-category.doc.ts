import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AddCategoryDto } from '../dto/add-category.dto';

export const addCategoryDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Add new category',
    }),
    ApiBody({
      type: AddCategoryDto,
    }),
  );
