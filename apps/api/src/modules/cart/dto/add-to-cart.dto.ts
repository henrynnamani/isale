import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: '38srh-sfh3823-4sdfhskhsaf',
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '38srh-sfh3823-4sdfhskhsaf',
    description: 'Product ID',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
