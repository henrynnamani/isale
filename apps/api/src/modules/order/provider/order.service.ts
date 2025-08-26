import { Injectable } from '@nestjs/common';
import { PlaceOrderDto } from '../dto/place-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../model/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async placeOrder(placeOrderDto: PlaceOrderDto) {
    return [];
  }
}
