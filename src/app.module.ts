import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigLocal, dbConfigServer } from './core/config/database_config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './core/services/mail/mail.module';
import { i18nOptions } from './core/services/i18n/i18n_options';
import { I18nModule } from 'nestjs-i18n';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(dbConfigLocal),
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    I18nModule.forRootAsync(i18nOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
