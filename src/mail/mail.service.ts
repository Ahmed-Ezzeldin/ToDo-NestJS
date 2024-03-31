import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AppLogger } from 'src/config/app_logger';
import { User } from 'src/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    try {
      //   const url = `example.com/auth/confirm?token=${token}`;

      await this.mailerService.sendMail({
        // to: user.email,
        to: 'ahmed.ezzeldin.ibrahim@gmail.com',
        from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
          url: 'https://example.com',
        },
      });
    } catch (e) {
        AppLogger.log("Error sending email");
        AppLogger.log(e);
    }
  }
}
