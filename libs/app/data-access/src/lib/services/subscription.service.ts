import { AuthTokenInterceptor } from '../interceptors/auth-token.interceptor';
import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { NotificationService } from './notification.service';
import { ErrorDialogInterceptor } from '../interceptors';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    @Inject(APP_CONFIG)
    private appConfig: AppConfig
  ) {}

  requestSubscription() {
    return this.notificationService
      .requestSubscription()
      .pipe(mergeMap(subscription => this.registerSubscription(subscription)));
  }

  registerSubscription(subscription: PushSubscription) {
    return this.http.post(`${this.appConfig.api}/subscription/web`, {
      subscription,
    });
  }

  delete() {
    const subscription = this.notificationService.getSubscription();

    if (!subscription) {
      return of();
    }

    return this.http.delete(`${this.appConfig.api}/subscription/web`, {
      body: {
        subscription,
      },
      headers: {
        [AuthTokenInterceptor.skipHeader]: 'true',
        [ErrorDialogInterceptor.skipHeader]: 'true',
      },
    });
  }
}
