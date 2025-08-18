import { Product } from '@/modules/product/model/product.entity';
import { BaseModel } from '@/shared/base-entity';
import slugify from 'slugify';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
export class Category extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 256,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

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
