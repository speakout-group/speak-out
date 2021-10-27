import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { FeaturesModule } from './features/features.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './features/auth/interceptor/auth-token.interceptor';
import { ErrorDialogInterceptor } from './core/interceptor/error-dialog.interceptor';
import { CoreModule } from './core/core.module';
import { AuthService } from './features/auth/service/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { SharedModule } from './shared/shared.module';

const initialize = (authService: AuthService) => async () => {
  if (authService.getAccessToken()) {
    try {
      await authService.getProfile().toPromise();
    } catch(err) {
      console.error(err);
    }
  }
};

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    SharedModule,
    FeaturesModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorDialogInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
