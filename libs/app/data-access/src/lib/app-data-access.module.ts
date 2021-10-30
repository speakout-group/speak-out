import { AppConfig, APP_CONFIG } from './app-data-access.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StorageData } from '@speak-out/shared-util-storage';
import { AuthService } from './services';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { AuthFacade, ConfFacade } from './+state';

@NgModule({
  providers: [AuthService, StorageData, AuthFacade, ConfFacade, SocialAuthService],
})
export class AppDataAccessModule {
  static forRoot(
    appConfig: AppConfig
  ): ModuleWithProviders<AppDataAccessModule> {
    const providers = [];
    const { google, facebook } = appConfig.apps;
    if (google) {
      providers.push({
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(google),
      });
    }

    if (facebook) {
      providers.push({
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(facebook),
      });
    }

    return {
      ngModule: AppDataAccessModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: appConfig ?? {},
        },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(google),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(facebook),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    };
  }
}
