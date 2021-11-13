import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule, StreamGuard } from '@speak-out/app-data-access';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeContainer, MainContainer } from './containers';
import {
  NotFoundPageComponent,
  SponsorPageComponent,
  ReadmePageComponent,
  HomePageComponent,
  PrivacyComponent,
  TermsComponent,
} from './pages';
import {
  SubscribeComponent,
  SponsorsComponent,
  ScheduleComponent,
  SpeakerComponent,
  ReadmeComponent,
  TalksComponent,
  TalkComponent,
} from './components';

@NgModule({
  declarations: [
    MainContainer,
    HomeContainer,
    SponsorsComponent,
    HomePageComponent,
    NotFoundPageComponent,
    SpeakerComponent,
    ScheduleComponent,
    TalksComponent,
    TalkComponent,
    SponsorPageComponent,
    ReadmePageComponent,
    ReadmeComponent,
    SubscribeComponent,
    TermsComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeContainer,
        children: [
          {
            path: '',
            component: HomePageComponent,
          },
          {
            path: 'readme',
            component: ReadmePageComponent,
            children: [
              {
                path: 'termos',
                component: TermsComponent,
              },
              {
                path: 'privacidade',
                component: PrivacyComponent,
              },
            ],
          },
          {
            path: 'patrocinador/:id',
            component: SponsorPageComponent,
          },
        ],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@speak-out/app-feature-auth').then(
            (m) => m.AppFeatureAuthModule
          ),
      },
      {
        path: 'devparana',
        canActivate: [StreamGuard],
        canLoad: [StreamGuard],
        loadChildren: () =>
          import('@speak-out/app-feature-stream').then(
            (module) => module.AppFeatureStreamModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('@speak-out/app-feature-calendar').then(
            (module) => module.AppFeatureCalendarModule
          ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotFoundPageComponent },
    ]),
  ],
})
export class AppFeatureShellModule { }
