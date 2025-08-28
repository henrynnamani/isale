import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { PaymentService } from './provider/payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateDoc } from '@/shared/doc-response';
import { ApiTags } from '@nestjs/swagger';
import { NowPaymentDto } from './providers/now-payment.provider';

@ApiTags('payment')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('crypto')
  @CreateDoc('Pay with crypto', NowPaymentDto)
  payWithCrypto(@Body() nowPaymentDto: NowPaymentDto) {
    return this.paymentService.payWithCrypto(nowPaymentDto);
  }

  @Post('fiat')
  @CreateDoc('Pay with fiat', CreatePaymentDto)
  payWithFiat(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.payWithFiat(createPaymentDto);
  }

  @Post('webhook/crypto')
  cryptoWebhook(@Body() payload: any) {
    return this.paymentService.handleCryptoWebhook(payload);
  }

  @Post('webhook/fiat')
  fiatWebhook(@Body() payload: any) {
    return this.paymentService.handleFiatWebhook(payload);
  }
}
