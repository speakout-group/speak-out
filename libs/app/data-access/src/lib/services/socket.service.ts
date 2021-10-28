import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { Inject, Injectable } from '@angular/core';
import { boundMethod } from 'autobind-decorator';
import { AuthService } from './auth.service';
import { Socket } from 'ngx-socket-io';
import { take } from 'rxjs/operators';

const getOptions = (authService: AuthService) => ({
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${authService.getAccessToken()}`,
      },
    },
  },
  autoConnect: false,
});

@Injectable()
export class SocketService extends Socket {
  constructor(
    private authService: AuthService,
    @Inject(APP_CONFIG)
    appConfig: AppConfig
  ) {
    super({
      url: appConfig.socket,
      options: getOptions(authService),
    });

    const io = this.ioSocket.io;
    io.on('reconnect_attempt', this.updateAccessToken);

    this.onConnect().subscribe(() => this.emit('user:subscribe'));

    this.onDisconnect().subscribe(reason => {
      if (reason !== 'io server disconnect') {
        return;
      }

      this.authService
        .loginWithRefreshToken()
        .pipe(take(1))
        .subscribe(() => this.connect());
    });
  }

  connect() {
    this.updateAccessToken();

    super.connect();
  }

  onConnect() {
    return this.fromEvent('connect');
  }

  onDisconnect() {
    return this.fromEvent<string>('disconnect');
  }

  @boundMethod
  updateAccessToken() {
    Object.assign(this.ioSocket?.io?.opts || {}, getOptions(this.authService));
  }
}
