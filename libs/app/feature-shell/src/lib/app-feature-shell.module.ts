import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeContainer, MainContainer } from './containers';
import { SponsorsComponent } from './components';
import { HomePageComponent } from './pages';

@NgModule({
  declarations: [
    MainContainer,
    HomeContainer,
    SponsorsComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    AppUiLayoutModule,
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
        component: MainContainer,
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
