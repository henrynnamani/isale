import { BaseModel } from '@/shared/base-entity';
import { Order } from './order.entity';
import { Product } from '@/modules/product/model/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('orderItem')
export class OrderItem extends BaseModel {
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column({
    type: 'numeric',
    nullable: false,
    default: 1,
  })
  quantity: number;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  priceAtPurchase: number;
}
