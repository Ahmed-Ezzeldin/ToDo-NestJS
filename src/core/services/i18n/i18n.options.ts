import { ConfigService } from '@nestjs/config/dist/config.service';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nAsyncOptions, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';

export const i18nOptions: I18nAsyncOptions = {
  useFactory: () => ({
    fallbackLanguage: 'en',
    loaderOptions: {
      // path: join(__dirname, '/core/services/i18n/'),
      path: join(__dirname, ''),
      watch: true,
    },
  }),
  resolvers: [
    AcceptLanguageResolver,
    new HeaderResolver(['x-custom-lang']),
    { use: QueryResolver, options: ['lang', 'locale'] },
    new CookieResolver(['lang', 'locale']),
  ],

  inject: [ConfigService],
};
