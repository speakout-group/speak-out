import { LoginPageComponent, RegisterPageComponent } from './pages';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule } from '@speak-out/app-data-access';
import { SocialLoginModule } from 'angularx-social-login';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
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
export class AppFeatureAuthModule {}
