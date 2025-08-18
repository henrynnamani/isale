import { Brand } from '@/modules/brand/model/brand.entity';
import { Category } from '@/modules/category/model/category.entity';
import { Color } from '@/modules/color/model/color.entity';
import { Ram } from '@/modules/ram/model/ram.entity';
import { Rom } from '@/modules/rom/model/rom.entity';
import { Vendor } from '@/modules/vendors/model/vendors.entity';
import { BaseModel } from '@/shared/base-entity';
import { ProductCondition } from '@/shared/enum/product-condition.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('product')
export class Product extends BaseModel {
  @Column({
    type: 'varchar',
    length: '92',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    array: true,
    nullable: false,
  })
  images: string[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  specification: Record<string, any>;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Color, (color) => color.products, { cascade: true })
  @JoinTable()
  colors: Color[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToMany(() => Ram, (ram) => ram.products)
  rams: Ram[];

  @ManyToMany(() => Rom, (rom) => rom.products)
  roms: Rom[];

  @Column({
    type: 'enum',
    enum: ProductCondition,
    nullable: false,
  })
  condition: ProductCondition;

  @Column({
    type: 'numeric',
    nullable: false,
    scale: 2,
  })
  price: number;

  @OneToOne(() => Vendor, (vendor) => vendor.products)
  vendor: Vendor;
}
