import {
  AuthFacade,
  SponsorFacade,
  ConfFacade,
  RoomFacade,
  ScheduleFacade,
} from './+state';
import { AppConfig, APP_CONFIG } from './app-data-access.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StorageData } from '@speak-out/shared-util-storage';
import { AuthService } from './services';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { ScheduleDataService } from './infrastructure';

@NgModule({
  providers: [
    AuthService,
    StorageData,
    AuthFacade,
    RoomFacade,
    ConfFacade,
    SponsorFacade,
    ScheduleFacade,
    ScheduleDataService,
    SocialAuthService,
  ],
})
export class AppDataAccessModule {
  static forRoot(
    appConfig: AppConfig
  ): ModuleWithProviders<AppDataAccessModule> {
    const providers = [];
    const { google } = appConfig.apps;
    if (google) {
      providers.push({
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(google),
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
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    };
  }
}
