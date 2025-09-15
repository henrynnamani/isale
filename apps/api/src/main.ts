import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_NAME } from './constant';
import { LoggingInterceptor } from './shared/interceptor/request-log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );

  app.enableCors();

  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .addBearerAuth()
    // .addTag('1.0')
    .setTitle(APP_NAME)
    .setDescription(`All Functional Endpoints For ${APP_NAME}`)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
