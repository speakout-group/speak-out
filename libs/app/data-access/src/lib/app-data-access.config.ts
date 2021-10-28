import { InjectionToken } from "@angular/core";

export interface AppConfig {
  api: string;
  socket: string;
  apps: {
    facebook: string;
    google: string;
    apple: {
      clientId: string;
      redirectUri: string;
    };
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config')
