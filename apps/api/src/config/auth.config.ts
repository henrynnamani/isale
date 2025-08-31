import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  jwtRefreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
}));
