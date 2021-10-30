import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { SponsorsPageComponent, SponsorPageComponent } from './pages';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  SponsorItemComponent,
  JoinSponsorDialogComponent,
  UpsertSponsorDialogComponent,
} from './components';

@NgModule({
  declarations: [
    SponsorsPageComponent,
    UpsertSponsorDialogComponent,
    JoinSponsorDialogComponent,
    SponsorPageComponent,
    SponsorItemComponent,
  ],
  exports: [SponsorPageComponent, SponsorsPageComponent],
  imports: [
    AppDataAccessModule,
    SharedUiCommonModule,
    SharedUiDialogsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SponsorsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: SponsorPageComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class AppFeatureSponsorModule {}
