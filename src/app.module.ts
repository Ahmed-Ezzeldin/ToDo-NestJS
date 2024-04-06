import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './core/config/database.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './core/services/mail/mail.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { join } from 'path';
import { AcceptLanguageResolver, HeaderResolver, QueryResolver } from 'nestjs-i18n';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   loaderOptions: {
    //     path: join(__dirname, '/core/services/i18n/'),
    //     watch: true,
    //   },
    //   resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    // }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          // path: join(__dirname, '/i18n/'),
          path: join(__dirname, '/core/services/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
