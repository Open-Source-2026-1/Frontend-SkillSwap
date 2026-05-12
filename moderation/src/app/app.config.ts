import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  provideAppInitializer,
  inject
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';

import {
  provideTranslateService,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
      http,
      './assets/i18n/',
      '.json'
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    provideAppInitializer(() => {
      const translate = inject(TranslateService);

      translate.setDefaultLang('en');
      translate.use(
          translate.getBrowserLang() || 'en'
      );
    })
  ]
};