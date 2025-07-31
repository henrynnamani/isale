import { BaseModel } from '@/shared/base-entity';
import { Column, Entity } from 'typeorm';

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
}
