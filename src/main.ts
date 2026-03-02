import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { Type } from 'class-transformer';
import { describe } from 'node:test';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('crud auth api')
    .setDescription('the user api description')
    .setVersion('1.0')
    .addTag('User')
    .addBearerAuth({
      type : 'http',
      scheme : 'bearer',
      bearerFormat : 'JWT',
      name : 'Authorization',
      description : 'Enter JWT Token',
      in : 'header'
    },'access-token')
    .build()
    ;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);

  console.log('letss go');
}
bootstrap();
