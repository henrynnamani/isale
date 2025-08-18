import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateBrandDto } from '../dto/create-brand.dto';

export const deleteBrandDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Brand',
    }),
    // ApiBearerAuth(),
    ApiParam({
      name: 'id',
      example: '0de9ab4b-1d67-4264-bf3b-29f488a4fd8b',
      description: 'ID of brand',
    }),
  );
};
