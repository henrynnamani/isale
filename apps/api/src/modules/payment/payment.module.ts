import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './providers/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './model/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
