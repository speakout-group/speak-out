import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule, TalksGuard } from '@speak-out/app-data-access';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { AppUiTalksModule } from '@speak-out/app-ui-talks';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalksContainer } from './containers';
import { TalkPageComponent, TalksPageComponent } from './pages';
import { CalendarDayViewComponent, CalendarNavComponent } from './components';

import { TalkViewComponent } from './components/talk-view/talk-view.component';
import { TalkUsersComponent } from './components/talk-users/talk-users.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatSelectModule,
    MatSidenavModule,
    AppUiTalksModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild([
      {
        path: '',
        canActivate: [TalksGuard],
        component: TalksContainer,
        children: [
          {
            path: '',
            component: TalksPageComponent,
          },
          {
            path: ':id',
            component: TalkPageComponent,
          },
        ],
      },
    ]),
  ],
  declarations: [
    TalksContainer,
    CalendarDayViewComponent,
    CalendarNavComponent,
    TalkPageComponent,
    TalksPageComponent,
    TalkViewComponent,
    TalkUsersComponent,
  ],
})
export class AppFeatureTalksModule {}
