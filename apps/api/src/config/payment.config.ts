import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => ({
  paystackBaseUrl: process.env.PAYSTACK_BASE_URL,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
}));
