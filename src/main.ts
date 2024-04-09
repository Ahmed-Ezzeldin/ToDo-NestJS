import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './core/config/swagger_options';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1/');
  await app.listen(3000).then(() => {
    console.log('successfully stared on port 3000');
  });
}
bootstrap();

/*
============================================================= Directory Structure

|
├── src
|   ├── app.controller.ts
|   ├── app.module.ts
|   ├── app.service.ts
|   ├── main.ts
|   |   
|   |── auth
|   |   ├── dtos
|   |   ├── guard
|   |   └── helpers
|   |   
|   |── core
|   |   ├── services
|   |   |   ├── mail
|   |   |   └── temp
|   |   |
|   |   ├── interceptors
|   |   ├── validation
|   |   └── config
|   |       ├── app_const.ts
|   |       └── app_logger.ts
|   |   
|   |── entity
|   |   ├── user.entity.ts
|   |   └── todo.entity.ts
|   |   
|   |── user
|   |── todo


============================================================= Todos
- Check dotenv configuration
- Upload project to server
- 

=============================================================
=============================================================
=============================================================
*/
