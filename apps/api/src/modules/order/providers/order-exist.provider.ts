import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../model/order.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class OrderExistProvider {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async checkOrderExist(id: string) {
    try {
      const order = await this.orderRepository.findOneOrFail({
        where: { id },
        relations: ['vendor', 'user'],
      });

      if (!order) {
        throw new NotFoundException(SYS_MSG.ORDER_NOT_FOUND);
      }

      return order;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
