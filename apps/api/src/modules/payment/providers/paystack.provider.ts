import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PaymentProvider, PaymentResponseDto } from './payment.provider';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as SYS_MSG from '@/shared/system-message';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { OrderExistProvider } from '@/modules/order/providers/order-exist.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../model/payment.entity';
import { Repository } from 'typeorm';
import { PaymentMethod } from '@/shared/enum/payment.enum';
import { PaymentStatus } from '@/shared/enum/order.enum';
import { TelegramService } from '@/modules/telegram/provider/telegram.service';

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

@Injectable()
export class PaystackProvider implements PaymentProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly orderExistProvider: OrderExistProvider,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly telegramBotService: TelegramService,
  ) {}
  async createPayment(data: CreatePaymentDto): Promise<PaymentResponseDto> {
    const paymentUrl = `${this.configService.get<string>('payment.paystackBaseUrl')}/transaction/initialize`;

    try {
      const response: PaystackResponse = await axios
        .post(
          paymentUrl,
          {
            email: data.email,
            amount: data.amount,
            metadata: {
              orderId: data.orderId,
              billingDetail: data?.billingDetail,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'payment.paystackSecretKey',
              )}`,
            },
          },
        )
        .then((res) => res.data);

      return {
        checkoutUrl: response.data.authorization_url,
        reference: response?.data.reference,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.PAYMENT_FAILED,
      });
    }
  }

  async handleWebhook(payload: any): Promise<void> {
    const event = payload.event;
    const orderId = payload.data.metadata.orderId;
    const order = await this.orderExistProvider.checkOrderExist(orderId);
    const billingDetail = payload.data.metadata.billingDetail;

    const telegramPayload = {
      productName: order.items[0].product.name,
      quantity: 1,
      totalAmount: order.total_amount.toLocaleString(),
      customerName: billingDetail.full_name,
      phoneNumber: billingDetail.phone_number,
      orderId: orderId,
    };

    await this.telegramBotService.notifyVendorOfOrder(
      order.vendor.telegramChatId,
      order.items[0].product.images[0],
      telegramPayload,
    );

    console.log(payload.data.metadata.billingDetail);

    if (event === 'charge.success' || event === 'charge.failed') {
      const status =
        event === 'charge.success' ? PaymentStatus.PAID : PaymentStatus.FAILED;

      try {
        const payment = this.paymentRepository.create({
          amount: payload.data.amount / 100,
          method: PaymentMethod.TRANSFER,
          reference: payload.data.reference,
          order: order,
          status,
        });

        await this.paymentRepository.save(payment);
      } catch (err) {
        throw new RequestTimeoutException(err, {
          description: SYS_MSG.DB_CONNECTION_ERROR,
        });
      }
    }
  }
}

// Remember to split 10%
