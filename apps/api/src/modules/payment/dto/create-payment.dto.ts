import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 10000,
    description: 'Payment amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'c0c44d7d-9892-468f-a6c2-fd8e2bdfb5cf',
    description: 'order ID',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    example: '',
    description: 'order ID',
  })
  @IsObject()
  @IsNotEmpty()
  billingDetail: {};

  @ApiProperty({
    example: 'hoyx0101@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
