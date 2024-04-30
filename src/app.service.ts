import { Injectable, Logger } from '@nestjs/common';
import { AppLogger } from './core/config/app_logger';

@Injectable()
export class AppService {
  getHello() {
    AppLogger.log(process.env.BASE_URL);
    return { hi: 'Hello World!', BASE_URL: process.env.BASE_URL };
  }
}
