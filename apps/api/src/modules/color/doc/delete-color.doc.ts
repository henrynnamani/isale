import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const deleteColorDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete color',
    }),
  );
