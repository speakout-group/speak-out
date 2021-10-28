import {
  NgModule,
  Provider,
  InjectionToken,
  ModuleWithProviders,
} from '@angular/core';

export const API_TOKEN = new InjectionToken<string>('api.token');

@NgModule()
export class AppSharedDataAccessModule {
  static forRoot(
    api: string,
    customProviders: Provider[] = []
  ): ModuleWithProviders<AppSharedDataAccessModule> {
    return {
      ngModule: AppSharedDataAccessModule,
      providers: [
        {
          provide: API_TOKEN,
          useValue: api,
        },
        ...customProviders,
      ],
    };
  }
}
