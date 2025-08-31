import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => ({
  paystackBaseUrl: process.env.PAYSTACK_BASE_URL,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  nowPaymentBaseUrl: process.env.NOWPAYMENT_BASE_URL,
  nowPaymentApiKey: process.env.NOWPAYMENT_API_KEY,
}));
