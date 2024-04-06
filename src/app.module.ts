import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './core/config/database.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './core/services/mail/mail.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { i18nOptions } from './core/services/i18n/i18n.options';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    I18nModule.forRootAsync(i18nOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
