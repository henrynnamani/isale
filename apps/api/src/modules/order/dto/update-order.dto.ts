import { DeliveryStatus } from '@/shared/enum/order.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
    description: 'Order status',
  })
  @IsEnum(DeliveryStatus)
  @IsNotEmpty()
  status: DeliveryStatus;
}

export class UpdateOrderParamDto {
  @ApiProperty({
    example: 'd8hfds9-dfsfhsdf-ksdhf32-dsh',
    description: 'Order ID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
