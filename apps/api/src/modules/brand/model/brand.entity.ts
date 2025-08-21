import { Product } from '@/modules/product/model/product.entity';
import { BaseModel } from '@/shared/base-entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';

@Entity('brands')
export class Brand extends BaseModel {
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
