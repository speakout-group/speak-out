import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDialogModule } from '@angular/material/dialog';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import localeBrExtra from '@angular/common/locales/extra/br';
import localeBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeBr, 'pt-BR', localeBrExtra);



import {
  AuthDataService,
  AppDataAccessModule,
  AuthTokenInterceptor,
} from '@speak-out/app-data-access';

import { environment, facebook } from '../environments/environment';
import { PixelModule } from '@speak-out/shared-ui-common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    PixelModule.forRoot(facebook),
    AppDataAccessModule.forRoot(environment),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@speak-out/app-feature-shell').then(
              (m) => m.AppFeatureShellModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthDataService) => async () => {
        if (authService.getAccessToken()) {
          try {
            await authService.getProfile().toPromise();
          } catch (err) {
            console.log(err);
          }
        }
      },
      deps: [AuthDataService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
