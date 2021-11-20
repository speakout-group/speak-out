import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppDataAccessModule, TalksGuard } from '@speak-out/app-data-access';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { AppUiTalksModule } from '@speak-out/app-ui-talks';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalksContainer } from './containers';
import { TalkPageComponent, TalksPageComponent } from './pages';
import { CalendarDayViewComponent, CalendarNavComponent, SponsorsComponent } from './components';

import { TalkViewComponent } from './components/talk-view/talk-view.component';
import { TalkUsersComponent } from './components/talk-users/talk-users.component';
import { SponsorsPageComponent } from './pages/sponsors-page/sponsors-page.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatSelectModule,
    MatSidenavModule,
    AppUiTalksModule,
    MatGridListModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    MatBottomSheetModule,
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
            path: 'patrocinadores',
            loadChildren: () =>
              import('@speak-out/app-feature-sponsors').then(
                (module) => module.AppFeatureSponsorsModule
              ),
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
    SponsorsComponent,
    TalkPageComponent,
    TalksPageComponent,
    TalkViewComponent,
    TalkUsersComponent,
    SponsorsPageComponent,
  ],
})
export class AppFeatureTalksModule {}
