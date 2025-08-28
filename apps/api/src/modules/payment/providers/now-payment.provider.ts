import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PaymentProvider, PaymentResponseDto } from './payment.provider';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import { EstimateDto } from '../dto/estimate.dto';
import axios from 'axios';
import * as SYS_MSG from '@/shared/system-message';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum CurrencyFrom {
  USD = 'usd',
}

enum CurrencyTo {
  BTC = 'btc',
  USDTERC20 = 'usdterc20',
  USDTTRC20 = 'usdttrc20',
  BNB = 'bnb',
}

export class NowPaymentDto {
  @ApiProperty({
    example: 500,
    description: 'USD amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'dfhsf-348dfs-sdkfhsdf-2019s',
    description: 'Order ID',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    enum: CurrencyFrom,
    default: CurrencyFrom.USD,
    description: 'Currency paid with',
  })
  @IsEnum(CurrencyFrom)
  currency_from: CurrencyFrom;

  @ApiProperty({
    enum: CurrencyTo,
    default: CurrencyTo.BTC,
    description: 'Cryptocurrency to convert to',
  })
  @IsEnum(CurrencyTo)
  currency_to: CurrencyTo;
}

@Injectable()
export class NowPaymentProvider implements PaymentProvider {
  baseUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.baseUrl = `${this.configService.get<string>('payment.nowPaymentBaseUrl')}`;
  }
  async createPayment(
    nowPaymentDto: NowPaymentDto,
  ): Promise<PaymentResponseDto> {
    console.log(nowPaymentDto);
    const estimate = await this.getUSDToCryptoEquivalent(nowPaymentDto);

    try {
      const payload = {
        price_amount: nowPaymentDto.amount,
        price_currency: 'usd',
        order_id: nowPaymentDto.orderId,
        success_url: 'https://github.com/henrynnamani',
        cancel_url: 'https://nowpayments.io',
      };

        const result = await axios.post(`${this.baseUrl}/invoice`, payload, {
          headers: {
            'x-api-key': this.configService.get<string>(
              'payment.nowPaymentApiKey',
            ),
          },
        });

      console.log(result);
    } catch (err) {
      console.log(err);
      throw new ServiceUnavailableException(SYS_MSG.NOWPAYMENT_API_UNAVAILABLE);
    }

    return {
      checkoutUrl: '',
      reference: '',
    };
  }

  handleWebhook(payload: any): Promise<void> {
    return;
  }

  async getUSDToCryptoEquivalent(nowPaymentDto: NowPaymentDto) {
    const { amount, currency_from, currency_to } = nowPaymentDto;

    // TODO: Remove <any>
    const status: any = await axios.get(`${this.baseUrl}/status`);

    if (status?.statusText != 'OK') {
      throw new ServiceUnavailableException(SYS_MSG.NOWPAYMENT_API_UNAVAILABLE);
    }

    const lessMinimumPaymentAmount: any = await axios.get(
      `${this.baseUrl}/min-amount`,
      {
        headers: {
          'x-api-key': this.configService.get<string>(
            'payment.nowPaymentApiKey',
          ),
        },
      },
    );

    if (status.estimated_amount < lessMinimumPaymentAmount.min_amount) {
      throw new BadRequestException(
        SYS_MSG.NOWPAYMENT_MINIMUM_AMOUNT(
          status.estimated_amount,
          lessMinimumPaymentAmount.min_amount,
        ),
      );
    }

    const result = await axios.get(
      `${this.baseUrl}/estimate?amount=${amount}&currency_from=${currency_from}&currency_to=${currency_to}`,
      {
        headers: {
          'x-api-key': this.configService.get<string>(
            'payment.nowPaymentApiKey',
          ),
        },
      },
    );

    return {
      data: result.data,
      message: 'working',
    };
  }
}
