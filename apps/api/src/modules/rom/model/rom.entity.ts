import { BaseModel } from '@/shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('rom')
export class Rom extends BaseModel {
  @Column({
    type: 'integer',
    nullable: false,
  })
  size: number;
}
