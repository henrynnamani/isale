import { BaseModel } from '@/shared/base-entity';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

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
}
