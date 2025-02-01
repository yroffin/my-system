import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';

import { graphsReducer, graphReducer } from './stats/graph.reducer';
import { stylesReducer, styleReducer } from './stats/style.reducer';
import { menuReducer, parameterReducer } from './stats/menu.reducer';
import { PreferencesReducer } from './stats/preference.reducer';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
    MessageService,
    ConfirmationService,
    provideHttpClient(),
    importProvidersFrom(LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: true
        }
      }
    }),
    provideStore({
      graphs: graphsReducer,
      graph: graphReducer,
      styles: stylesReducer,
      style: styleReducer,
      menu: menuReducer,
      preferences: PreferencesReducer,
      parameter: parameterReducer
    }),
  ]
};
