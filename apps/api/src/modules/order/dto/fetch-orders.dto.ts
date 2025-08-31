import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FetchOrderParamPaginationDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Limit of order list',
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'current page of order list',
  })
  @IsNumber()
  @IsOptional()
  page?: number;
}
