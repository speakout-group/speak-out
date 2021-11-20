import { AppDataAccessModule, SponsorsGuard } from '@speak-out/app-data-access';
import { SponsorPageComponent, SponsorsPageComponent } from './pages';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { SponsorsContainer } from './containers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GoogleFormComponent } from './components/google-form/google-form.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatSelectModule,
    MatSidenavModule,
    MatGridListModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [SponsorsGuard],
        component: SponsorsContainer,
        children: [
          {
            path: '',
            component: SponsorsPageComponent,
          },
          {
            path: ':id',
            component: SponsorPageComponent,
          },
        ],
      },
    ]),
  ],
  declarations: [
    SponsorsContainer,
    SponsorPageComponent,
    SponsorsPageComponent,
    GoogleFormComponent,
  ],
})
export class AppFeatureSponsorsModule {}
