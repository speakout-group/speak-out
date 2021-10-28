import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, tap } from 'rxjs/operators';

interface Config {
  webPublicKey: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  updateAvailable$ = this.swUpdate.available.pipe(
    tap(async () => {
      await this.swUpdate.activateUpdate();

      document.location.reload();
    })
  );

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    @Inject(APP_CONFIG)
    private appConfig: AppConfig
  ) {}

  getConfig() {
    return this.http.get<Config>(`${this.appConfig.api}/notification/config`);
  }

  requestSubscription() {
    return this.getConfig().pipe(
      mergeMap(({ webPublicKey: serverPublicKey }) =>
        this.swPush.requestSubscription({ serverPublicKey })
      ),
      tap((subscription) => this.setSubscription(subscription))
    );
  }

  getSubscription(): PushSubscription {
    return JSON.parse(sessionStorage.getItem('notificationToken') || '{}');
  }

  setSubscription(subscription: PushSubscription) {
    sessionStorage.setItem('notificationToken', JSON.stringify(subscription));
  }

  async checkForUpdates() {
    try {
      await this.swUpdate.checkForUpdate();
    } catch (e) {
      console.error('An error occured checking service worker updates', e);
    }
  }
}
