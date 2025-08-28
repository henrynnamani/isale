import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './provider/order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';
import { FilterOrderDto, GetOrderDetailParamDto } from './dto/filter-order.dto';
import {
  UpdateOrderParamDto,
  UpdateOrderStatusDto,
} from './dto/update-order.dto';

@Controller('orders')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @CreateDoc('Place order', PlaceOrderDto)
  placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return this.orderService.placeOrder(placeOrderDto);
  }

  @Get()
  @CreateGetDoc('Fetch all orders', FilterOrderDto)
  fetchAllOrder(@Query() filterOrderDto: FilterOrderDto) {
    const { limit, page, status } = filterOrderDto;
    return this.orderService.fetchAllOrder(status, {
      limit,
      page,
    });
  }

  @Get(':id')
  @CreateGetDoc('Get order detail', GetOrderDetailParamDto)
  getOrder(@Param() getOrderDetailParamDto: GetOrderDetailParamDto) {
    return this.orderService.getOrder(getOrderDetailParamDto.id);
  }

  @Post(':id/status')
  @CreateDoc('Update order status', UpdateOrderStatusDto)
  updateOrderStatus(
    @Param() updateOrderParamDto: UpdateOrderParamDto,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(
      updateOrderParamDto.id,
      updateOrderStatusDto,
    );
  }
}
