import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './provider/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './model/order.entity';
import { OrderItem } from './model/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
