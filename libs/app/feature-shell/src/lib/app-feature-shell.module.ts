import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule } from '@speak-out/app-data-access';
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
            path: 'readme',
            component: ReadmePageComponent,
          },
          {
            path: 'patrocinador/:id',
            component: SponsorPageComponent,
          },
        ],
      },
      { path: '**', component: NotFoundPageComponent },
    ]),
  ],
})
export class AppFeatureShellModule {}
