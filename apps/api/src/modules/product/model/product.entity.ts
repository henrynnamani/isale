import { Brand } from '@/modules/brand/model/brand.entity';
import { Category } from '@/modules/category/model/category.entity';
import { Color } from '@/modules/color/model/color.entity';
import { Ram } from '@/modules/ram/model/ram.entity';
import { Rom } from '@/modules/rom/model/rom.entity';
import { Vendor } from '@/modules/vendors/model/vendors.entity';
import { BaseModel } from '@/shared/base-entity';
import { ProductCondition } from '@/shared/enum/product-condition.enum';
import slugify from 'slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
    type: 'varchar',
    nullable: true,
  })
  slug: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  onDiscount: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  trueTone: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  faceId: boolean;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  specification: Record<string, any>;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToMany(() => Color, (color) => color.products, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  colors: Color[];

  @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
  brand: Brand;

  @ManyToMany(() => Ram, (ram) => ram.products, { eager: true })
  @JoinTable()
  rams: Ram[];

  @ManyToMany(() => Rom, (rom) => rom.products, { eager: true })
  @JoinTable()
  roms: Rom[];

  @Column({
    type: 'int',
    nullable: true,
  })
  battery: number;

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

  @Column({
    type: 'numeric',
    nullable: false,
    default: 1,
  })
  stock: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.products, { eager: true })
  vendor: Vendor;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      const baseSlug = slugify(this.name, { lower: true, strict: true });
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      this.slug = `${baseSlug}-${randomSuffix}`;
    }
  }
}
