import {
  AuthFacade,
  ConfFacade,
  RoomFacade,
  AwardFacade,
  SponsorFacade,
  ScheduleFacade,
  SubscribeFacade
} from './+state';
import { AppConfig, APP_CONFIG } from './app-data-access.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AwardDataService, AuthDataService, ScheduleDataService } from './infrastructure';
import { StorageData } from '@speak-out/shared-util-storage';
import { AuthService } from './services';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

@NgModule({
  providers: [
    AuthService,
    StorageData,
    AuthFacade,
    RoomFacade,
    ConfFacade,
    AwardFacade,
    SponsorFacade,
    ScheduleFacade,
    SubscribeFacade,
    AuthDataService,
    AwardDataService,
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
