import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './provider/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './model/payment.entity';
import { PaystackProvider } from './providers/paystack.provider';
import { OrderModule } from '../order/order.module';
import { NowPaymentProvider } from './providers/now-payment.provider';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), OrderModule, TelegramModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    NowPaymentProvider,
    PaystackProvider,
    {
      provide: 'CryptoPaymentProvider',
      useClass: NowPaymentProvider,
    },
    {
      provide: 'FiatPaymentProvider',
      useClass: PaystackProvider,
    },
  ],
})
export class PaymentModule {}
