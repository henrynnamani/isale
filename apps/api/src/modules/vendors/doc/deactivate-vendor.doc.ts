import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

export const deactivateVendor = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Deactivate vendor',
    }),
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      required: true,
      example: '0de9ab4b-1d67-4264-bf3b-29f488a4fd8b',
      description: 'unique vendor Id',
    }),
  );
};
