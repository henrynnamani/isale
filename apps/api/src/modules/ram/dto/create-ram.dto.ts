import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddRamDto {
  @ApiProperty({
    example: 45,
    description: 'Typical Ram size e.g 8, 32',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  size: number;
}
