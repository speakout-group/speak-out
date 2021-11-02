import { InjectionToken } from '@angular/core';

export interface AppConfig {
  api: string;
  socket: string;
  apps: {
    google: string;
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
