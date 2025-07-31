import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './shared/common.module';
import dataSource from './database/datasource';
import environmentValidation from './config/environment.validation';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
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

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [telegramConfig, paymentConfig, cloudinaryConfig],
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
    ColorModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
  ],
})
export class AppModule {}
