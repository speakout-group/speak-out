import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { MatExpansionModule } from '@angular/material/expansion';
import { SponsorsPageComponent, SponsorPageComponent } from './pages';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppUiDialogsModule } from '@speak-out/app-ui-dialogs';
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
    MatExpansionModule,
    AppDataAccessModule,
    AppUiDialogsModule,
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
