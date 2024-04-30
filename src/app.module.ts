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
import { User } from './entity/user.entity';
import { Todo } from './entity/todo.entity';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfigServer),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   port: parseInt(process.env.DB_PORT),
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   host: process.env.DB_HOST,
    //   //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   entities: [Todo, User],
    // }),
    MailModule,
    I18nModule.forRootAsync(i18nOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
