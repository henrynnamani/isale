import { User } from '@/modules/users/model/users.entity';
import { Vendor } from '@/modules/vendors/model/vendors.entity';
import { BaseModel } from '@/shared/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('review')
export class Review extends BaseModel {
  @Column({
    type: 'varchar',
    length: 256,
  })
  review: string;

  @Column({
    type: 'float',
    scale: 2,
  })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Vendor, (vendor) => vendor.reviews)
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;
}
