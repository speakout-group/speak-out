import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeContainer, MainContainer } from './containers';
import { SponsorsComponent } from './components';
import { HomePageComponent } from './pages';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { SpeakerComponent } from './components/speaker/speaker.component';
import { MemberComponent } from './components/member/member.component';

@NgModule({
  declarations: [
    MainContainer,
    HomeContainer,
    SponsorsComponent,
    HomePageComponent,
    NotFoundPageComponent,
    SpeakersComponent,
    SpeakerComponent,
    MemberComponent,
  ],
  imports: [
    CommonModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      // {
      //   path: '',
      //   component: MainContainer,
      //   children: [
      //     {
      //       path: 'confs',
      //       canActivate: [AuthGuard],
      //       loadChildren: () =>
      //         import('@speak-out/app-feature-conf').then(
      //           (m) => m.AppFeatureConfModule
      //         ),
      //     },
      //     {
      //       path: 'account',
      //       canActivate: [AuthGuard],
      //       loadChildren: () =>
      //         import('@speak-out/app-feature-user').then(
      //           (m) => m.AppFeatureUserModule
      //         ),
      //     },
      //     {
      //       path: 'sponsors',
      //       canActivate: [AuthGuard],
      //       loadChildren: () =>
      //         import('@speak-out/app-feature-sponsor').then(
      //           (m) => m.AppFeatureSponsorModule
      //         ),
      //     },
      //   ],
      // },
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
      { path: '**', component: NotFoundPageComponent },
    ]),
  ],
})
export class AppFeatureShellModule { }
