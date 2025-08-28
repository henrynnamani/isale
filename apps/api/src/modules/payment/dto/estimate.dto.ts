import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EstimateDto {
  @ApiProperty({
    example: 5000,
    description: 'USD amount',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'usd',
    description: 'currency to change from',
  })
  @IsString()
  @IsNotEmpty()
  currency_from: string;

  @ApiProperty({
    example: 'btc',
    description: 'cryptocurrency to change to',
  })
  @IsString()
  @IsNotEmpty()
  currency_to: string;
}
