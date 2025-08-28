import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

interface OrderItemI {
  productId: string;
  quantity: number;
}

export class PlaceOrderDto {
  @ApiProperty({
    example: '97b2ede1-2a53-439f-8933-035cc5274e1e',
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '0de9ab4b-1d67-4264-bf3b-29f488a4fd8b',
    description: 'vendor ID',
  })
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @ApiProperty({
    example: [
      {
        productId: '71a5496b-4610-4b1f-b8a3-701007db3cdd',
        quantity: 1,
      },
      {
        productId: 'bbf7001e-62f6-4ae6-aa15-d4e01aa97236',
        quantity: 1,
      },
    ],
    description: 'User ID',
  })
  @IsArray()
  @IsNotEmpty()
  items: OrderItemI[];
}
