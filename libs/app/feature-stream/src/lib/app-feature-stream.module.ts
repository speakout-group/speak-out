import { ScheduleToolbarItemComponent, ScheduleStepperComponent, YoutubeComponent } from './components';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule } from '@speak-out/app-data-access';
import { LinkPageComponent, LinksPageComponent } from './pages';
import { StreamContainer, LinksContainer } from './containers';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { StreamUrlPipe } from './pipes/stream-url.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IsLivePipe, WasPipe } from './pipes';
import { NgModule } from '@angular/core';
import { TalksPageComponent } from './pages/talks-page/talks-page.component';
import { OnlyStagePipe } from './pipes/only-stage.pipe';

@NgModule({
  imports: [
    LayoutModule,
    CommonModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LinksContainer,
        children: [
          { path: '', component: LinksPageComponent },
          { path: 'talks', component: TalksPageComponent },
          // { path: ':id', component: LinkPageComponent },
        ],
      },
      {
        path: ':id',
        component: StreamContainer,
      },
    ]),
  ],
  declarations: [
    ScheduleToolbarItemComponent,
    ScheduleStepperComponent,
    LinksPageComponent,
    LinkPageComponent,
    YoutubeComponent,
    StreamContainer,
    LinksContainer,
    StreamUrlPipe,
    IsLivePipe,
    WasPipe,
    TalksPageComponent,
    OnlyStagePipe,
  ],
  exports: [
    StreamUrlPipe,
    IsLivePipe,
    WasPipe,
    OnlyStagePipe
  ],
})
export class AppFeatureStreamModule {}
