import { CreatePaymentDto } from '../dto/create-payment.dto';
import { NowPaymentDto } from './now-payment.provider';

export interface PaymentResponseDto {
  checkoutUrl: string;
  reference: string;
}

export abstract class PaymentProvider {
  abstract createPayment(
    data: CreatePaymentDto | NowPaymentDto,
  ): Promise<PaymentResponseDto>;
  abstract handleWebhook(payload: any): Promise<void>;
}
