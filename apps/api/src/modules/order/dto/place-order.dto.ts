import { Column } from 'typeorm';
import { OrderItem } from '../model/order-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { string } from 'joi';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PlaceOrderDto {
  @ApiProperty({
    example: 'dfhdf-3823fdf-32hdfk',
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'dfhdf-3823fdf-32hdfk',
    description: 'vendor ID',
  })
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @ApiProperty({
    example: 5600,
    description: 'Total amount',
  })
  @IsInt()
  @IsNotEmpty()
  total_amount: number;

  @ApiProperty({
    example: ['dfhdf-3823fdf-32hdfk', 'sdfks-83sdjsa-dfjsd88'],
    description: 'User ID',
  })
  @IsArray()
  items: OrderItem[];
}
