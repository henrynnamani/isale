import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './shared/common.module';
import dataSource from './database/datasource';
import environmentValidation from './config/environment.validation';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponseInterceptor } from './shared/interceptor/data-response.interceptor';
import { TelegramModule } from './modules/telegram/telegram.module';
import telegramConfig from './config/telegram.config';
import paymentConfig from './config/payment.config';
import { VendorsModule } from './modules/vendors/vendors.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import cloudinaryConfig from './config/cloudinary.config';
import { BrandModule } from './modules/brand/brand.module';
import { RamModule } from './modules/ram/ram.module';
import { RomModule } from './modules/rom/rom.module';
import { ColorModule } from './modules/color/color.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ReviewModule } from './modules/review/review.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './modules/mail/mail.module';
import mailConfig from './config/mail.config';
import { OtpModule } from './modules/otp/otp.module';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { MailQueueModule } from './modules/mail-queue/mail-queue.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('auth.jwtSecret'),
        signOptions: {
          expiresIn: config.get<string>('auth.jwtAccessTokenExpire'),
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [
        telegramConfig,
        paymentConfig,
        cloudinaryConfig,
        authConfig,
        mailConfig,
      ],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSource.options,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async () => {
        if (!dataSource.isInitialized) {
          return await dataSource.initialize();
        } else {
          return dataSource;
        }
      },
    }),
    UsersModule,
    CommonModule,
    VendorsModule,
    AuthModule,
    TelegramModule,
    CloudinaryModule,
    BrandModule,
    RamModule,
    RomModule,
    ColorModule,
    CategoryModule,
    ProductModule,
    ReviewModule,
    CartModule,
    OrderModule,
    PaymentModule,
    MailModule,
    OtpModule,
    MailQueueModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
