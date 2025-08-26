import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './provider/order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoc } from '@/shared/doc-response';

@Controller('orders')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @CreateDoc('Place order', PlaceOrderDto)
  placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return this.orderService.placeOrder(placeOrderDto);
  }
}
