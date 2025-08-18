import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AddRamDto } from '../dto/create-ram.dto';

export const createRamDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Ram',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: AddRamDto,
    }),
  );
};
