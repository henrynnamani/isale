import { User } from '@/modules/users/model/users.entity';
import { BaseModel } from '@/shared/base-entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity('cart')
export class Cart extends BaseModel {
  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CartItem, (item) => item.cart, {
    cascade: true,
    eager: true,
  })
  items: CartItem[];
}
