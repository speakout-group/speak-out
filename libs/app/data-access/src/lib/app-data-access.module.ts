import { AppConfig, APP_CONFIG } from './app-data-access.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppleLoginProvider } from './providers';
import { AuthService } from './services';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, SocialAuthService],
})
export class AppDataAccessModule {
  static forRoot(
    appConfig: AppConfig
  ): ModuleWithProviders<AppDataAccessModule> {
    const providers = [];
    const { google, facebook, apple } = appConfig.apps;
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

    if (apple) {
      providers.push({
        id: AppleLoginProvider.PROVIDER_ID,
        provider: new AppleLoginProvider(apple),
      });
    }

    return {
      ngModule: AppDataAccessModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: appConfig,
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
              {
                id: AppleLoginProvider.PROVIDER_ID,
                provider: new AppleLoginProvider(apple),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    };
  }
}
