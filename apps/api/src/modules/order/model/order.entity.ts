import { User } from '@/modules/users/model/users.entity';
import { Vendor } from '@/modules/vendors/model/vendors.entity';
import { BaseModel } from '@/shared/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { DeliveryStatus } from '@/shared/enum/order.enum';
import { Payment } from '@/modules/payment/model/payment.entity';

@Entity('order')
export class Order extends BaseModel {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Vendor;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  total_amount: number;

  @Column({
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  delivery_status: DeliveryStatus;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => OrderItem, (item) => item.order, { eager: true })
  items: OrderItem[];
}
