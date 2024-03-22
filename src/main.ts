import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000).then(() => {
    console.log('successfully stared on port 3000');
  });
}
bootstrap();


/*
=============================================================
- Check .env file add and get data


=============================================================
=============================================================
*/