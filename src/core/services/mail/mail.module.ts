import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerOptions } from 'src/core/services/mail/mailer.options';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [MailerModule.forRoot(mailerOptions)],
})
export class MailModule {}
