import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  callbackUrl: process.env.TELEGRAM_WEBHOOK_URL,
}));
