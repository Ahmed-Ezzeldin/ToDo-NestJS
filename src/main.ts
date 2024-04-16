import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './core/config/swagger_options';
import { AppLogger } from './core/config/app_logger';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 406,
    }),
  );
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1/');
  await app.listen(3000);
  AppLogger.logColor(`TodoApp is listending to url ${await app.getUrl()}`, 'magenta');
}
bootstrap();

/*


============================================================= Todos
- Check dotenv configuration
- Upload project to server
- Pagination 
- Filter and search for todos and users
- 

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

=============================================================

  1. Informational responses --> (100 – 199)
  2. Successful responses -----> (200 – 299)
  3. Redirection messages -----> (300 – 399)
  4. Client error responses ---> (400 – 499)
  5. Server error responses ---> (500 – 599)

  ================================================ 1xx Informational
  100 ---> Continue
  101 ---> Switching Protocols
  ================================================ 2xx Success
  200 ---> OK
  201 ---> Created
  202 ---> Accepted
  203 ---> Non-authoritative Information
  204 ---> No Content
  205 ---> Reset Content
  206 ---> Partial Content
  ================================================ 3xx Redirection
  300 ---> Multiple Choices
  301 ---> Moved Permanently
  302 ---> Found
  303 ---> See Other 
  304 ---> Not Modified
  305 ---> Use Proxy
  306 ---> unused
  307 ---> Temporary Redirect
  308 ---> Permanent Redirect
  ================================================ 4xx Client Error
  400 ---> Bad request
  401 ---> Authorization required
  402 ---> Payment required
  403 ---> Forbidden
  404 ---> Not found
  405 ---> Method not allowed
  406 ---> Not acceptable
  407 ---> Proxy authentication required
  408 ---> Request timeout
  409 ---> Conflict
  410 ---> Gone
  411 ---> Length required
  412 ---> Precondition failed
  413 ---> Request entity too large
  414 ---> Request URI too large
  415 ---> Unsupported media type
  416 ---> Request range not satisfiable
  417 ---> Expectation failed
  422 ---> Unprocessable entity
  423 ---> Locked
  424 ---> Failed dependency
  ================================================ 5xx Server Error
  500 ---> Internal server error
  501 ---> Not Implemented
  502 ---> Bad gateway
  503 ---> Service unavailable
  504 ---> Gateway timeout
  505 ---> HTTP version not supported
  506 ---> Variant also negotiates
  507 ---> Insufficient storage
  508 ---> Loop Detected (WebDAV)
  509 ---> Bandwidth Limit Exceeded (Apache)
  510 ---> Not extended
  511 ---> Network Authentication Required
  598 ---> Network read timeout error
  599 ---> Network connect timeout error

=============================================================
=============================================================
=============================================================
*/
