import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AccountContainer, MainContainer } from './containers';
import { ConfMainContainer } from './containers/conf';
import { HomePage } from './pages/home/home.page';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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
        component: MainContainer,
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
    ]),
  ],
})
export class AppFeatureShellModule {}
