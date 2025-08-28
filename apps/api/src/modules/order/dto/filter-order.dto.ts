import { DeliveryStatus } from '@/shared/enum/order.enum';
import { PaginationDto } from '@/shared/pagination/pagination.dto';
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterOrderDto extends PickType(PaginationDto, [
  'page',
  'limit',
] as const) {
  @ApiPropertyOptional({
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  @IsEnum(DeliveryStatus)
  @IsOptional()
  status?: DeliveryStatus;
}

export class GetOrderDetailParamDto {
  @ApiProperty({
    example: 'hdfdf-384sdfhs-3ksh-sdkhfs21',
    description: 'order ID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
