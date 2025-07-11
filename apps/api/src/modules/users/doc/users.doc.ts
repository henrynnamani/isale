import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

export const CreateUserDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create user',
    }),
    // ApiBearerAuth(),
    ApiBody({
      required: true,
      type: CreateUserDto,
    }),
    ApiResponse({}),
  );
};
