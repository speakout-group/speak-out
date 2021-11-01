import { AccountContainer, HomeContainer, MainContainer } from './containers';
import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SponsorsComponent } from './components';
import { HomePageComponent } from './pages';

@NgModule({
  declarations: [
    MainContainer,
    HomeContainer,
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
        component: HomeContainer,
        children: [
          {
            path: '',
            component: HomePageComponent,
          },
          {
            path: 'auth',
            loadChildren: () =>
              import('@speak-out/app-feature-auth').then(
                (m) => m.AppFeatureAuthModule
              ),
          },
        ],
      },
      {
        path: 'account',
        component: AccountContainer,
        canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@speak-out/app-feature-conf').then(
                (m) => m.AppFeatureConfModule
              ),
          },
        ]
      },
      {
        path: 'sponsors',
        component: MainContainer,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@speak-out/app-feature-sponsor').then(
                (m) => m.AppFeatureSponsorModule
              ),
          },
        ],
      }
    ]),
  ],
})
export class AppFeatureShellModule {}
