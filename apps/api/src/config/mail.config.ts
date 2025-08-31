import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: Boolean(process.env.SMTP_SECURE),
  password: process.env.SMTP_PASS,
  user: process.env.SMTP_USER,
}));
