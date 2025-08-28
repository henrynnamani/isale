import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentProvider } from '../providers/payment.provider';
import { NowPaymentDto } from '../providers/now-payment.provider';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('CryptoPaymentProvider')
    private readonly cryptoProvider: PaymentProvider,
    @Inject('FiatPaymentProvider')
    private readonly fiatProvider: PaymentProvider,
  ) {}

  async payWithCrypto(nowPaymentDto: NowPaymentDto) {
    return this.cryptoProvider.createPayment(nowPaymentDto);
  }

  async payWithFiat(payWithFiatDto: CreatePaymentDto) {
    return this.fiatProvider.createPayment(payWithFiatDto);
  }

  async handleCryptoWebhook(payload: any) {}

  async handleFiatWebhook(payload: any) {
    return this.fiatProvider.handleWebhook(payload);
  }
}
