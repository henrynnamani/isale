import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateColorDto } from '../dto/create-color.dto';

export const createColorDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create new color',
    }),
    ApiBody({
      type: CreateColorDto,
    }),
  );
};
