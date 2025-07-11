import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_NAME } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      // disableErrorMessages: true
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    // .addTag('1.0')
    .setTitle(APP_NAME)
    .setDescription(`All Functional Endpoints For ${APP_NAME}`)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(3000);
}
bootstrap();
