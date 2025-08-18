import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';

export const CreateProductDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create new product' }),
    ApiBody({
      type: CreateProductDto,
      description: 'product creation detail',
    }),
    ApiBadRequestResponse({
      example: {
        data: null,
        message: 'Product can not be created',
        success: false,
      },
    }),
  );
