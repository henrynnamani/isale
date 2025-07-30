import { BaseModel } from '@/shared/base-entity';
import { Column } from 'typeorm';

export class Ram extends BaseModel {
  @Column({
    type: 'integer',
    nullable: false,
  })
  size: number;
}
