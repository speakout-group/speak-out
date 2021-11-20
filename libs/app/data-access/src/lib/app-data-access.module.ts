import {
  AuthFacade,
  ConfFacade,
  TalkFacade,
  RoomFacade,
  AwardFacade,
  SponsorFacade,
  SidenavFacade,
  ScheduleFacade,
  SubscribeFacade,
} from './+state';
import { AppConfig, APP_CONFIG } from './app-data-access.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StorageData } from '@speak-out/shared-util-storage';
import { AuthService } from './services';
import {
  TalkDataService,
  AuthDataService,
  AwardDataService,
  ScheduleDataService,
} from './infrastructure';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  TalksGuard,
  SponsorsGuard
} from './guards';

@NgModule({
  providers: [
    TalksGuard,
    SponsorsGuard,
    AuthService,
    StorageData,
    AuthFacade,
    TalkFacade,
    RoomFacade,
    ConfFacade,
    AwardFacade,
    SponsorFacade,
    SidenavFacade,
    ScheduleFacade,
    TalkDataService,
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
