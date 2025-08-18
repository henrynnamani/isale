import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateBrandDto } from '../dto/create-brand.dto';

export const createbrandDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create New Brand',
    }),
    // ApiBearerAuth(),
    ApiBody({
      type: CreateBrandDto,
    }),
  );
};

// created-brand -> 330704be-f77c-442c-981c-cde3e52ffa62