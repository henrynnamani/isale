import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AddRomDto } from '../dto/create-rom.dto';

export const createRomDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Rom',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: AddRomDto,
    }),
  );
};
