import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDialogModule } from '@angular/material/dialog';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  AuthService,
  AppDataAccessModule,
  AuthTokenInterceptor,
  ErrorDialogInterceptor,
} from '@speak-out/app-data-access';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
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
      useFactory: (authService: AuthService) => async () => {
        if (authService.getAccessToken()) {
          try {
            await authService.getProfile().toPromise();
          } catch (err) {
            console.log(err);
          }
        }
      },
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorDialogInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
