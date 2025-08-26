import { Order } from '@/modules/order/model/order.entity';
import { BaseModel } from '@/shared/base-entity';
import { PaymentStatus } from '@/shared/enum/order.enum';
import { PaymentMethod } from '@/shared/enum/payment.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('payment')
export class Payment extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  reference: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.TRANSFER,
  })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  amount: number;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
