import { ApplicationConfig, provideZoneChangeDetection, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfigService, errorInterceptor, loadingInterceptor, LoadingNgxSpinnerInterceptor } from './app/core';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { environment } from './environments/environment';
import { providePrimeNG } from 'primeng/config';
import { yellowPreset } from './app/core/themes/primeng-presets/custom-preset';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

const initializerConfigFn = (): any => {
  const configService = inject(ConfigService);
  return configService.loadAppConfig();
};

// const HttpLoaderFactory = (http: HttpBackend) => {
//     return new TranslateHttpLoader(new HttpClient(http), 'assets/i18n/', '.json');
// };
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializerConfigFn),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor, LoadingNgxSpinnerInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: environment.defaultLanguage,
      lang: environment.defaultLanguage
    }),
    provideRouter(appRoutes, withViewTransitions()),
    providePrimeNG({
      theme: {
        preset: yellowPreset,
        options: {
          darkModeSelector: false || 'none',
          cssLayer: {
            name: 'primeng',
            order: 'base, theme, primeng'
          }
        }
      },
      ripple: true
    }),

    provideToastr({
      toastClass: 'ngx-toastr',
      onActivateTick: true,
      maxOpened: 1,
      autoDismiss: true
    })
  ]
};
