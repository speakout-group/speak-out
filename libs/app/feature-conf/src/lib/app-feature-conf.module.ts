import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { ConfsPageComponent, ConfPageComponent } from './pages';
import { NgModule } from '@angular/core';
import {
  ConfItemComponent,
  JoinConfDialogComponent,
  UpsertConfDialogComponent,
} from './components';
import { RouterModule } from '@angular/router';
import { AppDataAccessModule } from '@speak-out/app-data-access';

@NgModule({
  declarations: [
    ConfsPageComponent,
    UpsertConfDialogComponent,
    JoinConfDialogComponent,
    ConfPageComponent,
    ConfItemComponent,
  ],
  exports: [ConfPageComponent, ConfsPageComponent],
  imports: [
    AppDataAccessModule,
    SharedUiDialogsModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfsPageComponent,
      },
      {
        path: ':id',
        component: ConfPageComponent,
      },
      {
        path: ':id/salas',
        loadChildren: () =>
          import('@speak-out/app-feature-room').then(
            (m) => m.AppFeatureRoomModule
          ),
      },
      {
        path: ':id/patrocinadores',
        loadChildren: () =>
          import('@speak-out/app-feature-sponsor').then(
            (module) => module.AppFeatureSponsorModule
          ),
      },
      {
        path: ':id/palestrantes',
        loadChildren: () =>
          import('@speak-out/app-feature-speaker').then(
            (module) => module.AppFeatureSpeakerModule
          ),
      },
    ]),
  ],
})
export class AppFeatureConfModule {}
