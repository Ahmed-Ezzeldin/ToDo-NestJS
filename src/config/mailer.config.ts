import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailerConfig: MailerOptions = {
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // if secure false port = 587, if true port= 465
      auth: {
        user: 'testing.ahmed26@gmail.com',
        pass: 'pawlqfcxwwbrbxya',
      },
    },
    // defaults: {
    //   // from: '"No Reply" <noreply@example.com>',
    //   from: 'E-Commerce App <testing.ahmed26@gmail.com>',
    // },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  };
  