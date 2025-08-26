import { ApiParam } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDetailDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
