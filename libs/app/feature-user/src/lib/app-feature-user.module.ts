import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  RecoverChangePasswordPageComponent,
  RecoverPageComponent,
  SettingsPageComponent,
} from './pages';

@NgModule({
  declarations: [
    RecoverPageComponent,
    SettingsPageComponent,
    RecoverChangePasswordPageComponent,
  ],
  imports: [
    AppDataAccessModule,
    SharedUiCommonModule,
    SharedUiDialogsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'settings',
      },
      {
        path: 'recover',
        pathMatch: 'full',
        component: RecoverPageComponent,
        canActivate: [AuthGuard],
        data: {
          requireAuth: false,
        },
      },
      {
        path: 'recover/:code',
        pathMatch: 'full',
        component: RecoverChangePasswordPageComponent,
        canActivate: [AuthGuard],
        data: {
          requireAuth: false,
        },
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class AppFeatureUserModule {}
