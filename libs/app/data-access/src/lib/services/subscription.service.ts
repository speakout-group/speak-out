import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const { api } = environment;

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  requestSubscription() {
    return this.notificationService
      .requestSubscription()
      .pipe(
        mergeMap((subscription) => this.registerSubscription(subscription))
      );
  }

  registerSubscription(subscription: PushSubscription) {
    return this.http.post(`${api}/subscription/web`, {
      subscription,
    });
  }

  delete() {
    const subscription = this.notificationService.getSubscription();

    if (!subscription) {
      return of();
    }

    return this.http.delete(`${api}/subscription/web`, {
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
