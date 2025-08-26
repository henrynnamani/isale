import { PAGINATION_LIMIT } from '@/constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CursorPaginationDto {
  @ApiPropertyOptional({
    example: '48sdhs9-2hdf-sdhse',
    description: 'Entity ID',
  })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiProperty({
    example: 10,
    description: 'The limit of products per view',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = PAGINATION_LIMIT;
}
