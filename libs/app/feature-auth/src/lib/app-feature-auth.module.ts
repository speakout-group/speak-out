import { LoginPageComponent, RegisterPageComponent } from './pages';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule } from '@speak-out/app-data-access';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { SocialLoginModule } from 'angularx-social-login';
import { PlatformModule } from '@angular/cdk/platform';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    PlatformModule,
    AppUiLayoutModule,
    SocialLoginModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPageComponent,
        // data: {
        //   requireAuth: false,
        // },
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        // data: {
        //   requireAuth: false,
        // },
      },
    ]),
  ],
  exports: [SocialLoginModule],
})
export class AppFeatureAuthModule { }
