import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @ApiProperty({
    example: 'test-id-uuid',
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    example: '2025-07-11T14:20:30.123Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-11T14:20:30.123Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
