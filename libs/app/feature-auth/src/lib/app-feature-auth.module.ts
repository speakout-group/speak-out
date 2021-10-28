import { AppSharedDataAccessModule } from '@speak-out/app/shared/data-access';
import { AppSharedModulesModule } from '@speak-out/app/shared/modules';
import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { LoginPageComponent, RegisterPageComponent } from './pages';
import { SocialLoginModule } from 'angularx-social-login';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    SocialLoginModule,
    AppDataAccessModule,
    AppSharedModulesModule,
    AppSharedDataAccessModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [AuthGuard],
        data: {
          requireAuth: false,
        },
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [AuthGuard],
        data: {
          requireAuth: false,
        },
      },
    ]),
  ],
  exports: [
    SocialLoginModule
  ]
})
export class AppFeatureAuthModule {}
