import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class DocResponse<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed' })
  message: string;

  @ApiProperty({ required: false })
  data?: T;
}

export const CreateDoc = (
  summary: string,
  dto: Type<any>, // dynamically accept DTO
) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({
      type: dto,
      description: `${summary} request body`,
    }),
    ApiExtraModels(DocResponse, dto),
    ApiResponse({
      status: 201,
      description: `${summary} success response`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(DocResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(dto) },
            },
          },
        ],
      },
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

export const CreateGetDoc = (
  summary: string,
  dto: Type<any>, // dynamically accept DTO
) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiExtraModels(DocResponse, dto),
    ApiResponse({
      status: 201,
      description: `${summary} success response`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(DocResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(dto) },
            },
          },
        ],
      },
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
