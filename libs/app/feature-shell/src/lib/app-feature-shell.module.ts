import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { MatGridListModule } from '@angular/material/grid-list';
import { AccountContainer, MainContainer } from './containers';
import { ConfMainContainer } from './containers/conf';
import { HomePageComponent } from './pages';
import { SponsorsComponent } from './components';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MainContainer,
    ConfMainContainer,
    AccountContainer,
    SponsorsComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainContainer,
        children: [
          {
            path: '',
            component: HomePageComponent,
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
        path: 'sponsors',
        component: MainContainer,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@speak-out/app-feature-sponsor').then(
                (m) => m.AppFeatureSponsorModule
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
