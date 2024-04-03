import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1/');
  await app.listen(3000).then(() => {
    console.log('successfully stared on port 3000');
  });
}
bootstrap();

/*
=============================================================
- Send reste password email to user
- Check dotenv configuration
- Upload project to server
- Validate strong password for user
- Integrate with swagger
- Localizarion (En, Ar)
- Prevent user enter extar values in requests body 
- 
- 
- 

=============================================================
=============================================================
*/
