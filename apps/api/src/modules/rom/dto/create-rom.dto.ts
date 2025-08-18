import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddRomDto {
  @ApiProperty({
    example: 16,
    description: 'Typical Rom size e.g 8, 32',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  size: number;
}
