import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { mailerConfig } from 'src/config/mailer.config';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [MailerModule.forRoot(mailerConfig)],
})
export class MailModule {}
