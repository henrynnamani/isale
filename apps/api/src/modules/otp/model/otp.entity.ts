import { OTP_EXPIRY } from '@/constant';
import { User } from '@/modules/users/model/users.entity';
import { BaseModel } from '@/shared/base-entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('otp')
export class Otp extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  token: string;

  @Index('idx_expiry')
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  expiry: Date;

  @ManyToOne(() => User, (user) => user.otps)
  user: User;

  constructor() {
    super();
    this.expiry = new Date(new Date().getTime() + OTP_EXPIRY * 60000);
  }
}
