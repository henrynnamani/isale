import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { CartExistProvider } from '../providers/cart-exist.provider';
import * as SYS_MSG from '@/shared/system-message';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../model/cart.entity';
import { Repository } from 'typeorm';
import { AddCartItemProvider } from '../providers/add-cart-item.provider';
import { ClearCartParamDto } from '../dto/clear-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartExist: CartExistProvider,
    private readonly addCartItemProvider: AddCartItemProvider,
  ) {}
  async addToCart(addToCartDto: AddToCartDto) {
    const { productId, userId, quantity } = addToCartDto;

    try {
      let cart = await this.cartExist.checkCartExist(userId);

      if (!cart) {
        cart = this.cartRepository.create({
          user: { id: userId },
          items: [],
        });

        cart = await this.cartRepository.save(cart);
      }

      let item = cart.items.find((item) => item.product.id === productId);

      if (item) {
        item.quantity = quantity;
      } else {
        const newItem = await this.addCartItemProvider.addCartItem(
          cart,
          addToCartDto,
        );

        cart.items.push(newItem);
      }

      const result = await this.cartRepository.save(cart);

      return {
        data: cart,
        message: SYS_MSG.CART_UPDATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async clearCart(clearCartParamDto: ClearCartParamDto) {
    const { id } = clearCartParamDto;
    try {
      const cart = await this.cartExist.checkCartExistById(id);

      await this.cartRepository.delete({ id: cart.id });

      return {
        data: cart,
        message: SYS_MSG.CART_CLEARED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
