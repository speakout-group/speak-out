import { AppDataAccessModule, TalksGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { AppUiLayoutModule } from '@speak-out/app-ui-layout';
import { NotFoundPageComponent } from './pages';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainContainer } from './containers';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [MainContainer],
  imports: [
    CommonModule,
    AppUiLayoutModule,
    AppDataAccessModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: 'home',
        loadChildren: () =>
          import('@speak-out/app-feature-home').then(
            (module) => module.AppFeatureHomeModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@speak-out/app-feature-auth').then(
            (m) => m.AppFeatureAuthModule
          ),
      },
      {
        path: 'calendar',
        canActivate: [TalksGuard],
        loadChildren: () =>
          import('@speak-out/app-feature-calendar').then(
            (module) => module.AppFeatureCalendarModule
          ),
      },
      {
        path: 'devparana',
        // canActivate: [TalksGuard],
        loadChildren: () =>
          import('@speak-out/app-feature-talks').then(
            (module) => module.AppFeatureTalksModule
          ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotFoundPageComponent },
    ]),
  ],
})
export class AppFeatureShellModule { }
