import joi from 'joi';

export default joi.object({
  NODE_ENV: joi.string().valid('development', 'test').default('development'),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().default(5440).required(),
  DB_NAME: joi.string().required(),
  DB_PASS: joi.string().required(),
  DB_SYNC: joi.boolean().optional(),
  TELEGRAM_BOT_TOKEN: joi.string().required(),
  TELEGRAM_WEBHOOK_URL: joi.string().required(),
  PAYSTACK_SECRET_KEY: joi.string().required(),
  PAYSTACK_BASE_URL: joi.string().required(),
  CLOUDINARY_NAME: joi.string().required(),
  CLOUDINARY_API_KEY: joi.string().required(),
  CLOUDINARY_API_SECRET: joi.string().required(),
  NOWPAYMENT_API_KEY: joi.string().required(),
  NOWPAYMENT_BASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRE: joi
    .string()
    .pattern(/^\d+[smhd]$/)
    .required()
    .messages({
      'string.pattern.base':
        'JWT_ACCESS_TOKEN_EXPIRE must be a valid duration like 15m, 1h, 1d',
    }),
  JWT_REFRESH_TOKEN_EXPIRE: joi
    .string()
    .pattern(/^\d+[smhd]$/)
    .required()
    .messages({
      'string.pattern.base':
        'JWT_ACCESS_TOKEN_EXPIRE must be a valid duration like 15m, 1h, 1d',
    }),
  SMTP_HOST: joi.string().required(),
  SMTP_PORT: joi.number().required(),
  SMTP_SECURE: joi.bool().required(),
  SMTP_PASS: joi.string().required(),
  SMTP_USER: joi.string().required(),
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  GOOGLE_CALLBACK_URL: joi.string().required(),
});
