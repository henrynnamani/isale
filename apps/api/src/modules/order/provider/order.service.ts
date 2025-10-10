import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PlaceOrderDto } from '../dto/place-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../model/order.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';
import { OrderItem } from '../model/order-item.entity';
import { Product } from '@/modules/product/model/product.entity';
import { VendorExistProvider } from '@/modules/vendors/providers/vendor-exist.provider';
import { UserExistProvider } from '@/modules/users/providers/user-exist.provider';
import { PaginationService } from '@/shared/pagination/pagination.service';
import { UpdateOrderStatusDto } from '../dto/update-order.dto';
import { OrderExistProvider } from '../providers/order-exist.provider';
import { FetchOrderParamPaginationDto } from '../dto/fetch-orders.dto';
import { DeliveryStatus } from '@/shared/enum/order.enum';
import { PaginationDto } from '@/shared/pagination/pagination.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userExistProvider: UserExistProvider,
    private readonly vendorExist: VendorExistProvider,
    private readonly paginationService: PaginationService,
    private readonly orderExistProvider: OrderExistProvider,
  ) {}

  async placeOrder(placeOrderDto: PlaceOrderDto) {
    try {
      const orderItems = [];
      let total = 0;

      const user = await this.userExistProvider.checkUserExist(
        placeOrderDto.userId,
      );

      const vendor = await this.vendorExist.checkVendorExistById(
        placeOrderDto.vendorId,
      );

      for (const item of placeOrderDto.items) {
        const product = await this.productRepository.findOneByOrFail({
          id: item.productId,
        });

        product.available = false;

        const priceAtPurchase = product.price;
        const orderItem = this.orderItemRepository.create({
          product,
          quantity: item.quantity,
          priceAtPurchase,
        });

        total += item.quantity * priceAtPurchase;
        orderItems.push(orderItem);

        this.productRepository.save(product);
      }

      const order = this.orderRepository.create({
        user,
        vendor,
        total_amount: total,
        items: orderItems,
      });

      const result = await this.orderRepository.manager.transaction(
        async (manager) => {
          const savedOrder = await manager.save(order);

          for (const item of orderItems) {
            item.order = savedOrder;
            await manager.save(item);
          }

          return savedOrder;
        },
      );

      return {
        data: result,
        message: SYS_MSG.ORDER_PLACED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async getOrder(id: string) {
    try {
      const order = await this.orderRepository.findOneOrFail({ where: { id } });

      return {
        data: order,
        message: SYS_MSG.ORDER_DETAIL_FETCHED,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async fetchAllOrder() {
    const userId = '87db2cbd-1900-4721-bd61-b7bb4cdbc6dd';
    try {
      const orders = await this.orderRepository.find({
        where: { user: { id: userId } },
      });

      // if (status) {
      //   query.andWhere('order.delivery_status = :status', {
      //     status,
      //   });
      // }

      // const result = await this.paginationService.paginateQuery(
      //   query,
      //   fetchOrderParamPaginationDto,
      // );

      return {
        data: orders,
        message: SYS_MSG.ORDER_LIST_FETCHED,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const { status } = updateOrderStatusDto;
    const order = await this.orderExistProvider.checkOrderExist(id);

    try {
      order.delivery_status = status;

      await this.orderRepository.save(order);

      return {
        data: order,
        message: SYS_MSG.ORDER_UPDATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
