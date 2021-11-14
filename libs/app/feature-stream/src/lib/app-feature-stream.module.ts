import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule } from '@speak-out/app-data-access';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StreamContainer, LinksContainer } from './containers';
import { IsLivePipe, IsPastPipe, OnlyStagePipe } from './pipes';
import {
  ScheduleToolbarItemComponent,
  ScheduleStepperComponent,
  YoutubeComponent,
} from './components';
import {
  LinkPageComponent,
  TalksPageComponent,
  LinksPageComponent,
} from './pages';
import { TalksContainer, TalkContainer } from './containers';
import { OnlyLivePipe } from './pipes/only-live.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TalksContainer,
        children: [{ path: '', component: TalksPageComponent }],
      },
      {
        path: ':id',
        component: TalkContainer,
      },
    ]),
  ],
  declarations: [
    ScheduleToolbarItemComponent,
    ScheduleStepperComponent,
    LinksPageComponent,
    TalksPageComponent,
    LinkPageComponent,
    YoutubeComponent,
    StreamContainer,
    LinksContainer,
    OnlyStagePipe,
    IsLivePipe,
    IsPastPipe,
    TalksContainer,
    TalkContainer,
    OnlyLivePipe,
    GroupByPipe,
  ],
})
export class AppFeatureStreamModule {}
