import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule } from '@speak-out/app-data-access';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { AppUiTalksModule } from '@speak-out/app-ui-talks';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeContainer } from './containers';
import { NgModule } from '@angular/core';
import {
  TalkComponent,
  TalksComponent,
  ReadmeComponent,
  SpeakerComponent,
  ScheduleComponent,
  SponsorsComponent,
  SubscribeComponent,
} from './components';
import {
  TermsComponent,
  PrivacyComponent,
  HomePageComponent,
  ReadmePageComponent,
  SponsorPageComponent,
} from './pages';

@NgModule({
  imports: [
    CommonModule,
    AppUiTalksModule,
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
    ]),
  ],
  declarations: [
    HomeContainer,
    SponsorsComponent,
    HomePageComponent,
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
  ]
})
export class AppFeatureHomeModule {}
