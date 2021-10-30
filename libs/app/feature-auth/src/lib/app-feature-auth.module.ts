import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { LoginPageComponent, RegisterPageComponent } from './pages';
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
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginPageComponent,
        // canActivate: [AuthGuard],
        data: {
          requireAuth: false,
        },
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        // canActivate: [AuthGuard],
        data: {
          requireAuth: false,
        },
      },
    ]),
  ],
  exports: [SocialLoginModule],
})
export class AppFeatureAuthModule {}
