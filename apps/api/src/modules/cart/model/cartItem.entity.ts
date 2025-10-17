import { BaseModel } from '@/shared/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '@/modules/product/model/product.entity';

@Entity('cartItem')
export class CartItem extends BaseModel {
  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
