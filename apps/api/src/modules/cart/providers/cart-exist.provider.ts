import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../model/cart.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class CartExistProvider {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async checkCartExist(id: string) {
    try {
      let cart = await this.cartRepository.findOne({
        where: { user: { id } },
        relations: ['items', 'user'],
      });

      if (!cart) {
        throw new NotFoundException(SYS_MSG.CART_EMPTY);
      }

      return cart;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async checkCartExistById(id: string) {
    try {
      let cart = await this.cartRepository.findOne({
        where: { id },
        relations: ['items', 'user'],
      });

      if (!cart) {
        throw new NotFoundException(SYS_MSG.CART_EMPTY);
      }

      return cart;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
