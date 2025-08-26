import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './provider/cart.service';
import { CartExistProvider } from './providers/cart-exist.provider';
import { AddCartItemProvider } from './providers/add-cart-item.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './model/cart.entity';
import { CartItem } from './model/cartItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartController],
  providers: [CartService, CartExistProvider, AddCartItemProvider],
})
export class CartModule {}
