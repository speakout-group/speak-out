import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppDataAccessModule } from '@speak-out/app-data-access';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarPageComponent } from './pages';
import { TalksContainer } from './containers';
import {
  CalendarDayViewComponent,
  CalendarWeekViewComponent,
  CalendarNavComponent,
  TalkFormComponent,
} from './components';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatSelectModule,
    MatSidenavModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild([
      {
        path: '',
        component: TalksContainer,
        children: [
          {
            path: '',
            component: CalendarPageComponent,
          },
        ],
      },
    ]),
  ],
  declarations: [
    TalksContainer,
    CalendarPageComponent,
    CalendarDayViewComponent,
    CalendarWeekViewComponent,
    CalendarNavComponent,
    TalkFormComponent,
  ],
})
export class AppFeatureCalendarModule {}
