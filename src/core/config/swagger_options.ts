import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions
 = new DocumentBuilder()
  .setTitle('Todo backend')
  .setDescription('Todo API Description')
  .setVersion('1.0')
  .addTag('todo')
  .build();
