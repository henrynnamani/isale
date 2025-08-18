import { Product } from '@/modules/product/model/product.entity';
import { BaseModel } from '@/shared/base-entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('rom')
export class Rom extends BaseModel {
  @Column({
    type: 'integer',
    nullable: false,
  })
  size: number;

  @ManyToMany(() => Product, (product) => product.rams)
  products: Product[];
}
