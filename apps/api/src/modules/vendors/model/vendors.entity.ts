import { Product } from '@/modules/product/model/product.entity';
import { Review } from '@/modules/review/model/review.entity';
import { BaseModel } from '@/shared/base-entity';
import { bankCodeEnum } from '@/shared/enum/bank-code.enum';
import slugify from 'slugify';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

@Entity('vendors')
export class Vendor extends BaseModel {
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  slug: string;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  subaccount: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  accountNumber: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  logoImageUrl: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  telegramChatId: number;

  @Column({
    type: 'enum',
    enum: bankCodeEnum,
    default: bankCodeEnum.NONE,
  })
  bankCode: string;

  @OneToMany(() => Review, (review) => review.vendor)
  reviews: Review[];

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isVerified: boolean;

  @BeforeInsert()
  generateSlug() {
    if (this.name) {
      const baseSlug = slugify(this.name, { lower: true, strict: true });
      const randomSuffix = Math.random().toString(36).substring(2, 4);

      this.slug = `${baseSlug}-${randomSuffix}`;
    }
  }
}
