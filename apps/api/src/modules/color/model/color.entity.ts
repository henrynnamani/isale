import { Product } from '@/modules/product/model/product.entity';
import { BaseModel } from '@/shared/base-entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('color')
export class Color extends BaseModel {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 6,
  })
  hex: string;

  @ManyToMany(() => Product, (product) => product.colors)
  products: Product[];
}
