import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../model/cartItem.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import * as SYS_MSG from '@/shared/system-message';
import { Cart } from '../model/cart.entity';

@Injectable()
export class AddCartItemProvider {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async addCartItem(cart: Cart, cartItem: AddToCartDto) {
    try {
      const item = this.cartItemRepository.create({
        cart,
        product: { id: cartItem.productId },
      });

      await this.cartItemRepository.save(item);

      return item;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
