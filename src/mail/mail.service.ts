import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AppLogger } from 'src/config/app_logger';
import { User } from 'src/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVerifyingEmail(user: User, optCode: string) {
    try {
      await this.mailerService.sendMail({
        // to: user.email,
        to: 'ahmed.ezzeldin.ibrahim@gmail.com',
        from: '"Support Team" <support@example.com>',
        subject: 'Welcome to TodoNestjs',
        template: './verifying_email',
        context: {
          appName: 'TodoNestjs',
          name: 'Hossam',
          otpCode: optCode,
          address: 'B451 Smart Village، ABOU RAWASH، GIZA',
          city: 'Cairo, Egypt',
        },
      });
    } catch (error) {
      AppLogger.log(error, true);
    }
  }

  async sendResetPassword(user: User, optCode: string) {
    try {
      await this.mailerService.sendMail({
        // to: user.email,
        to: 'ahmed.ezzeldin.ibrahim@gmail.com',
        from: '"Support Team" <support@example.com>',
        subject: 'Password Reset',
        template: './reset_password',
        context: {
          appName: 'TodoNestjs',
          name: 'Hossam',
          otpCode: optCode,
          address: 'B451 Smart Village، ABOU RAWASH، GIZA',
          city: 'Cairo, Egypt',
        },
      });
    } catch (error) {
      AppLogger.log(error, true);
    }
  }
}
