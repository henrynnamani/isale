import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './shared/common.module';
import dataSource from './database/datasource';
import environmentValidation from './config/environment.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
