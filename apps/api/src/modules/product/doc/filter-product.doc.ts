import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const FilterProductDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Filter product' }),
    ApiQuery({
      name: 'name',
      required: false,
      type: String,
      description: 'Filter by product name',
    }),
    ApiQuery({
      name: 'cursor',
      required: false,
      type: String,
      description: '',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      example: 4,
      type: Number,
      description: 'list of product limit',
    }),
    ApiQuery({
      name: 'condition',
      required: false,
      description: 'Filter by product condition',
    }),
    ApiQuery({
      name: 'categoryId',
      required: false,
      type: String,
      description: 'Filter by product category',
    }),
    ApiQuery({
      name: 'brandId',
      required: false,
      type: String,
      description: 'Filter by product brand',
    }),
    ApiQuery({
      name: 'minPrice',
      required: false,
      type: Number,
      description: 'Filter by minimum price',
    }),
    ApiQuery({
      name: 'battery',
      required: false,
      type: Number,
      description: 'Filter by Battery health',
    }),
    ApiQuery({
      name: 'maxPrice',
      required: false,
      type: Number,
      description: 'Filter by maximum price',
    }),
    ApiQuery({
      name: 'rams',
      required: false,
      isArray: true,
      type: [String],
      description: 'Array of RAM IDs',
    }),
    ApiQuery({
      name: 'roms',
      required: false,
      isArray: true,
      type: [String],
      description: 'Array of ROM IDs',
    }),
    ApiQuery({
      name: 'colors',
      required: false,
      type: [String],
      description: 'Array of Color IDs',
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or bad request',
      schema: {
        example: {
          data: null,
          message: 'Bad request',
          success: false,
        },
      },
    }),
  );
