import { Cart } from '@/modules/cart/model/cart.entity';
import { Order } from '@/modules/order/model/order.entity';
import { Otp } from '@/modules/otp/model/otp.entity';
import { Review } from '@/modules/review/model/review.entity';
import { BaseModel } from 'src/shared/base-entity';
import { UserRoleEnum } from 'src/shared/enum/user-role.enum';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  emailVerified: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken?: string;

  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  googleId: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;
}
