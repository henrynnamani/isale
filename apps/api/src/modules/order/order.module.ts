import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './provider/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './model/order.entity';
import { OrderItem } from './model/order-item.entity';
import { Product } from '../product/model/product.entity';
import { User } from '../users/model/users.entity';
import { VendorsModule } from '../vendors/vendors.module';
import { UsersModule } from '../users/users.module';
import { PaginationService } from '@/shared/pagination/pagination.service';
import { OrderExistProvider } from './providers/order-exist.provider';

@Module({
  imports: [
    UsersModule,
    VendorsModule,
    TypeOrmModule.forFeature([Order, OrderItem, Product, User]),
  ],
  controllers: [OrderController],
  providers: [OrderService, PaginationService, OrderExistProvider],
  exports: [OrderExistProvider],
})
export class OrderModule {}
