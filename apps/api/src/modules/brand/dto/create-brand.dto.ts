import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Samsung',
    required: true,
    description: 'Name of brand',
  })
  @IsString()
  name: string;
}
