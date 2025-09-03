import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { HttpBackend, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfigService, errorInterceptor, loadingInterceptor, LoadingNgxSpinnerInterceptor } from './app/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { environment } from './environments/environment';
import { providePrimeNG } from 'primeng/config';
import { yellowPreset } from './app/core/themes/primeng-presets/custom-preset';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

const initializerConfigFn = (): any => {
    const configService = inject(ConfigService);
    return configService.loadAppConfig();
};

const HttpLoaderFactory = (http: HttpBackend) => {
    return new TranslateHttpLoader(new HttpClient(http), 'assets/i18n/', '.json');
};
export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(initializerConfigFn),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideAnimations(),
        DialogService,
        DynamicDialogRef,
        DynamicDialogConfig,
        provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor, LoadingNgxSpinnerInterceptor])),
        importProvidersFrom([
            TranslateModule.forRoot({
                defaultLanguage: environment.defaultLanguage,
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpBackend]
                }
            })
        ]),
        provideRouter(appRoutes, withViewTransitions()),
        providePrimeNG({
            theme: {
                preset: yellowPreset,
                options: {
                    darkModeSelector: false || 'none'
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
