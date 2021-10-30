import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AccountContainer, MainContainer } from './containers';
import { ConfMainContainer } from './containers/conf';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [ConfMainContainer, MainContainer, HomePage, AccountContainer],
  imports: [
    CommonModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainContainer,
        children: [
          {
            path: '',
            component: HomePage,
          },
        ],
      },
      {
        path: 'account',
        component: AccountContainer,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@speak-out/app-feature-user').then(
                (m) => m.AppFeatureUserModule
              ),
          },
        ],
      },
      {
        path: 'confs',
        component: ConfMainContainer,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@speak-out/app-feature-conf').then(
                (m) => m.AppFeatureConfModule
              ),
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@speak-out/app-feature-auth').then(
            (m) => m.AppFeatureAuthModule
          ),
      },
      {
        path: 'rooms',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@speak-out/app-feature-room').then(
            (m) => m.AppFeatureRoomModule
          ),
      },
    ]),
  ],
})
export class AppFeatureShellModule {}
